import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from todos.models import TaskList, Task
from coolname import generate_slug

def task_to_dict(t: Task) -> dict:
    if t:
        return ({
            'model': 'Task',
            'lst': t.lst.key,
            'id': t.id.hex,
            'name': t.name,
            'done': t.done
        })
    else:
        return None


class ChatConsumer(WebsocketConsumer):

    def send_error_code(self, code):
        self.send(text_data=json.dumps({
                'message': json.dumps({
                            'kind': 'kaboom',
                            'code': code
                        })
            }))
    
    def handle_error(self, code):
        self.send_error_code(self, code)
        return self.close()

    def connect(self):
        
        rn = self.scope['url_route']['kwargs']['room_name']
        
        if (rn == 'create'):
            key = generate_slug(2)
            n = TaskList(key=key)
            n.save()
            self.accept()

            self.send(text_data=json.dumps({
                'message': json.dumps({
                            'kind': 'move-to',
                            'key': key
                        })
            }))

            self.room_name = key

            self.room_group_name = self.room_name


            # Join room group
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )

            # in future send only to self
            self.send_update(n)
            return
        
        if (TaskList.objects.filter(key=rn).count() != 1):
            print('Tried to join nonexisting tasklist')
            self.accept()
            self.send_error_code(21)
            # self.send(text_data=json.dumps({
            #     'message': {
            #         'type': 'chat_message',
            #         'message': {
            #             'kind': 'kaboom',
            #             'code': 21
            #         }
            #     }
            # }))
            return self.close(code=4421)

        self.room_name = rn
        # self.room_group_name = 'chat_%s' % self.room_name
        self.room_group_name = self.room_name

        tasklist = TaskList.objects.get(key=self.room_name)
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        # in future send only to self
        self.send_update(tasklist)
    
        self.accept()

        

    def disconnect(self, close_code):
        # Leave room group
        try:
            async_to_sync(self.channel_layer.group_discard)(
                self.room_group_name,
                self.channel_name
            )
        except:
            self.close(code=4420)

    #Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        # message = text_data_json['message']
        print(f'Received message from {self.channel_name}')
        print(text_data_json)

        if text_data_json['kind'] == 'create_task':
            self.handle_create_task(text_data_json)
        elif text_data_json['kind'] == 'delete_task':
            self.handle_delete_task(text_data_json)
        elif text_data_json['kind'] == 'task_done':
            self.handle_task_done(text_data_json)
        elif text_data_json['kind'] == 'task_undone':
            self.handle_task_undone(text_data_json)


    def send_update(self, task_list):
        print(f"Sending update to room {self.room_group_name}")
        tasks = task_list.task_set.all()
        tasks_dict = [task_to_dict(t) for t in tasks]

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': json.dumps({
                    'kind': 'todo_init',
                    'todos': tasks_dict
                })
            }
        )


    def handle_create_task(self, text_data_json):
        tl = TaskList.objects.filter(key=self.room_name)
        if tl.count() != 1:
            print("Tried to create a task in nonexisting tasklist")
            return self.close(code=4422)
        if tl.count() == 1:
            tl = tl.get()
            t = Task(lst=tl, name=text_data_json['taskName'])
            t.save()
            
            print(f"Sending update to room {self.room_group_name}")
            tasks = tl.task_set.all()
            tasks_dict = [task_to_dict(t) for t in tasks]

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': json.dumps({
                        'kind': 'todo_init',
                        'todos': tasks_dict
                    })
                }
            )

    def handle_delete_task(self, text_data_json):
        tl = TaskList.objects.filter(key=self.room_name)
        if tl.count() != 1:
            print("Tried to delete a task in nonexisting tasklist")
            return self.close(code=4423)

        if tl.count() == 1:
            tl = tl.get()
            try:
                task = Task.objects.get(id=text_data_json['taskId'])
            except Task.DoesNotExist:
                print('Task not found')
                return self.close(code=4424)

            if task.lst == tl:
                task.delete()
            else:
                print("Tried to delete a task in another tasklist. Ouch!")
                return self.close(code=4425)

            self.send_update(tl)

    def handle_task_done(self, text_data_json):
        tl = TaskList.objects.filter(key=self.room_name)

        if tl.count() != 1:
            print("Tried to delete a task in nonexisting tasklist")
            return self.close(code=4426)

        if tl.count() == 1:
            tl = tl.get()
            try:
                task = Task.objects.get(id=text_data_json['taskId'])
            except Task.DoesNotExist:
                print('Task not found')
                return self.close(code=4427)

            if task.lst == tl:
                task.done = True
                task.save()
            else:
                print("Tried to do a task in another tasklist. Ouch!")
                return self.close(code=4428)

            self.send_update(tl)

    
    def handle_task_undone(self, text_data_json):
        tl = TaskList.objects.filter(key=self.room_name)

        if tl.count() != 1:
            print("Tried to undo a task in nonexisting tasklist")
            return self.close(code=4429)

        if tl.count() == 1:
            tl = tl.get()
            try:
                task = Task.objects.get(id=text_data_json['taskId'])
            except Task.DoesNotExist:
                print('Task not found')
            
            if task.lst == tl:
                task.done = False
                task.save()
            else:
                print("Tried to do a task in another tasklist. Ouch!")
                return self.close(code=4430)

            self.send_update(tl)


    # Receive message from room group
    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'sent_by': 'chat_message',
            'message': message
        }))