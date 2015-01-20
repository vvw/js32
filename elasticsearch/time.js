// magazine/time/

{
	year: 1923
	article: {
		title: "Mr. Harding's Defeat "，
		time: "Saturday, Mar. 03, 1923",
		content: [
			"Seeking only the nation's welfare, Mr. Harding has suffered defeat at the hands of Congress. Not only that, but the man who was elected President by the largest plurality in history has been reproved by a Congress controlled by his own party. ",
			"The Ship Subsidy Bill, never popular, and never made so by the President, was politely strangled to death.",
			"The wisdom of some of the most important of the President's appointments has been questioned. For example, Daugherty, Butler, Reily."
		]
	}
}

{
	"order": {
		"properties": {
			"id": {
				"type": "string",
				"store": "yes",
				"index": "not_analyzed"
			},
			"date": {
				"type": "date",
				"store": "no",
				"index": "not_analyzed"
			},
			"customer_id": {
				"type": "string",
				"store": "yes",
				"index": "not_analyzed"
			},
			"sent": {
				"type": "boolean",
				"index": "not_analyzed"
			},
			"name": {
				"type": "string",
				"index": "analyzed"
			},
			"quantity": {
				"type": "integer",
				"index": "not_analyzed"
			},
			"vat": {
				"type": "double",
				"index": "no"
			}
		}
	}
}

{
	"order": {
		"properties": {
			"id": {
				"type": "string",
				"store": "yes",
				"index": "not_analyzed"
			},
			"date": {
				"type": "date",
				"store": "no",
				"index": "not_analyzed"
			},
			"customer_id": {
				"type": "string",
				"store": "yes",
				"index": "not_analyzed"
			},
			"sent": {
				"type": "boolean",
				"store": "no",
				"index": "not_analyzed"
			},
			"item": {
				"type": "object",
				"properties": {
					"name": {
						"type": "string",
						"store": "no",
						"index": "analyzed"
					},
					"quantity": {
						"type": "integer",
						"store": "no",
						"index": "not_analyzed"
					},
					"vat": {
						"type": "double",
						"store": "no",
						"index": "not_analyzed"
					}
				}
			}
		}
	}
}

{
	"order": {
		"properties": {
			"id": {
				"type": "string",
				"store": "yes",
				"index": "not_analyzed"
			},
			"date": {
				"type": "date",
				"store": "no",
				"index": "not_analyzed"
			},
			"customer_id": {
				"type": "string",
				"store": "yes",
				"index": "not_analyzed"
			},
			"sent": {
				"type": "boolean",
				"store": "no",
				"index": "not_analyzed"
			},
			"item": {
				"type": "nested",
				"properties": {
					"name": {
						"type": "string",
						"store": "no",
						"index": "analyzed"
					},
					"quantity": {
						"type": "integer",
						"store": "no",
						"index": "not_analyzed"
					},
					"vat": {
						"type": "double",
						"store": "no",
						"index": "not_analyzed"
					}
				}
			}
		}
	}
}



