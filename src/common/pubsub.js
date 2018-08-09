/**
 * Pub Sub Events
 * @return {Object}: subscribe() - publish()
 */
export default function Pubsub() {
	function isObject(obj) {
		return (typeof obj === "object" && obj !== null) || typeof obj === "function";
	}
	if (!isObject(window.pubsubTopics)) {
		window.pubsubTopics = {};
	}
	const topics = window.pubsubTopics;
	const hOP = topics.hasOwnProperty;

	return {
		subscribe(topic, listener) {
			// Create the topic's object if not yet created
			if (!hOP.call(topics, topic)) topics[topic] = [];

			// Add the listener to queue
			const index = topics[topic].push(listener) - 1;

			// Provide handle back for removal of topic
			return {
				remove() {
					delete topics[topic][index];
				}
			};
		},
		publish(topic, info) {
			// If the topic doesn't exist, or there's no listeners in queue, just leave
			if (!hOP.call(topics, topic)) return;

			// Cycle through topics queue, fire!
			topics[topic].forEach(item => {
				item(info !== undefined ? info : {});
			});
		}
		// unsubscribe() {

		// }
	};
}
