export default [
	{
		"file": "./src/modules/Button/index.js",
		"name": "Button",
		"module": "buttons",
		"description": "A button. Push it and it does stuff.",
		"examples": "<div class=\"container\"><h4 id=\"basic-button\">Basic button</h4>\n<Example>\n  <Button>Button</Button>\n</Example>\n\n<h4 id=\"ghost-button\">Ghost button</h4>\n<Example>\n  <Button ghost>Button</Button>\n</Example>\n\n<h4 id=\"big-button\">Big button</h4>\n<Example>\n  <Button big>Button</Button>\n</Example>\n</div>",
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
				"description": "If true button is ghost style"
			},
			"fluid": {
				"type": {
					"name": "bool"
				},
				"required": false,
				"description": "If true button expands to fill container"
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
		"description": "An alternative styling for a checkbox",
		"examples": "<div class=\"container\"><h4 id=\"basic-switch\">Basic switch</h4>\n<Example>\n  <Switch name=\"someSwitch\" />\n</Example>\n\n<h4 id=\"square-switch\">Square switch</h4>\n<Example>\n  <Switch name=\"squareSwitch\" square />\n</Example></div>",
		"props": {
			"className": {
				"type": {
					"name": "string"
				},
				"required": false,
				"description": ""
			},
			"name": {
				"type": {
					"name": "string"
				},
				"required": true,
				"description": "Used as elements ID"
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
				"description": "If true switch is square style",
				"defaultValue": {
					"value": "false",
					"computed": false
				}
			}
		}
	}
]