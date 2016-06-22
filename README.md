# React Portland UI

A component & pattern library based on the Portland UI Kit.

#### [Docs](http://react-portland-ui.surge.sh/)

## If you're reading this you're here too soon!

Star the repo and come back later. Maybe it will be finished :grin:

## Instillation

```
npm install --save react-portland-ui
```

There's two ways to include the styles; via the compiled `styles.css` or using the source stylus modules avaiable at `styles/index.styl`.

#### Using compiles styles

Best for simpler use cases without much customization.

From the root of your application:

```javascript
import 'react-portland-ui/styles.css'
```

#### Using stylus modules

For more advanced cases with custom styling needs. First, install [stylus-relative-loader](https://github.com/walmartlabs/stylus-relative-loader) and configure it to use the `resolve url` option.

From your stylus root:

```stylus
@import '~react-portland-ui/dist/stylus/index'
```

## Development

Clone the repo then

```
npm install
npm run dev
```

and navigate to `localhost:3000`.

## Documentation

```
npm run docs:dev
```

and navigate to `localhost:3000`.

Modules can be documented via their `documentation.md` file and comments inline with their `propTypes`.
