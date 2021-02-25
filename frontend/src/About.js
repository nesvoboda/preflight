function About(props) {
      return (
      	<div>
      		<h2 className="text-2xl font-bold">About Preflight</h2>
      		<div className="mt-5">
      			<p>Preflight is a small web-app for people who want to collaborate on a set of tasks.</p>
      			<p className="mt-3">Imagine you're going to groceries with friends.</p>
      			<p>You take a bottle of olive oil and suddenly you think:</p>
      			<p className="mt-6  italic">What if Alice or Bob already took olive oil?</p>
      			<p className="mt-6">You won't have to keep that in mind anymore.</p>
      		</div>
      		<h2 className="text-2xl font-bold mt-10">Feedback</h2>
      		<div className="mt-5">
      			<p>We would <strong>love</strong> to hear feedback from you!</p>
      			<p className="mt-3">Drop us a line at <a className="underline" href="mailto:hi@pre-flight.link">hi@pre-flight.link</a> ;).</p>
      		</div>
      	</div>
      	);
}

export default About