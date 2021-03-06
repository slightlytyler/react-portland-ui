const definedColors = {
  'light-gray-a': '#f0f2f7',
  'light-gray-b': '#e4e7ef',
  'dark-gray-a': '#b9bed1',
  'dark-gray-b': '#a1a6bb',
  'dark-blue-a': '#3a405b',
  'dark-blue-b': '#222328',
  'blue-a': '#3b55e6',
  'blue-b': '#334cd5',
  'aqua-a': '#51dde9',
  'aqua-b': '#32cdda',
  'green-a': '#4be1ab',
  'green-b': '#43d29e',
  'red-a': '#fe5339',
  'red-b': '#eb4e36',
  'yellow-a': '#f3d351',
  'yellow-b': '#e8c63b',
};

export default color => definedColors[color] || color;
