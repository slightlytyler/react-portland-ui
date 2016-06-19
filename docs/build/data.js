export default [
	{
		"file": "./src/modules/Button/index.js",
		"name": "Button",
		"module": "buttons",
		"description": "Hey this is a great button.",
		"examples": "<div class=\"container\"><h1 id=\"header\">Header</h1>\n<Button>Button</Button></div>",
		"props": {
			"className": {
				"type": {
					"name": "string"
				},
				"required": false,
				"description": ""
			},
			"children": {
				"type": {
					"name": "node"
				},
				"required": false,
				"description": ""
			},
			"type": {
				"type": {
					"name": "string"
				},
				"required": false,
				"description": "HTML type attribute"
			},
			"onClick": {
				"type": {
					"name": "func"
				},
				"required": false,
				"description": ""
			},
			"ghost": {
				"type": {
					"name": "bool"
				},
				"required": false,
				"description": "If true component has ghost styling"
			},
			"fluid": {
				"type": {
					"name": "bool"
				},
				"required": false,
				"description": "If true component expands to fill container"
			},
			"big": {
				"type": {
					"name": "bool"
				},
				"required": false,
				"description": "If true component will be big size"
			}
		}
	},
	{
		"file": "./src/modules/Checkbox/Switch/index.js",
		"name": "Switch",
		"module": "checkboxes",
		"description": "It's a checkbox. Wow!",
		"examples": "<div class=\"container\"><h1 id=\"header\">Header</h1>\n<Switch name=\"unchecked\" />\n\n<Switch name=\"checked\" value={true} /></div>",
		"props": {
			"name": {
				"type": {
					"name": "string"
				},
				"required": true,
				"description": ""
			},
			"value": {
				"type": {
					"name": "bool"
				},
				"required": false,
				"description": ""
			},
			"onChange": {
				"type": {
					"name": "func"
				},
				"required": false,
				"description": ""
			},
			"label": {
				"type": {
					"name": "string"
				},
				"required": false,
				"description": ""
			},
			"error": {
				"type": {
					"name": "array"
				},
				"required": false,
				"description": ""
			},
			"square": {
				"type": {
					"name": "bool"
				},
				"required": false,
				"description": "",
				"defaultValue": {
					"value": "false",
					"computed": false
				}
			}
		}
	}
]