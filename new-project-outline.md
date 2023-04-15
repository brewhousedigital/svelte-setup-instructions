# Project Outline

> Authors: Names Go Here

This file is a hybrid document used for outlining the upgrade project, along with providing all the information needed to understand the application. It includes how to get the project up and running, how things are organized, how to document, and how to create new components and hooks.



## Development

The structure for the application will look like this:

```text
src/
├─ components/
├─ data/
├─ functions/
├─ mui/
├─ pages/
```



### Folder: `components`

The `components` folder will hold folders for each component including its main `.tsx` file, and any `.test.tsx` files that go with it. This can either be a single component and it's test, or a collection of multiple components. A good use case for this might be for Charts. Inside the `components` folder, we can create a `Charts` folder, that holds additional folders such as:

```text
src/
├─ components/
│  ├─ Charts/
│  │  ├─ BarChartAssetsOverTime/
│  │  │  ├─ BarChartAssetsOverTime.tsx
│  │  │  ├─ BarChartAssetsOverTime.test.tsx
│  │  ├─ GaugeChartPerformanceAndRisk/
│  │  │  ├─ GaugeChartPerformanceAndRisk.tsx
│  │  │  ├─ GaugeChartPerformanceAndRisk.test.tsx
│  │  ├─ PieChartAssetAllocation/
│  │  │  ├─ PieChartAssetAllocation.tsx
│  │  │  ├─ PieChartAssetAllocation.test.tsx
```

This way all the charts exist together in the same place, and making it easier to locate all the charts at once. Another good use case for this would be a `Layouts` folder since in case you need different views inside the app.



### Folder: `data`

This folder will hold any json files that are useful for creating placeholder data such as tables, navigation items, or even mock data.

⚠ This is still in planning and not sure if this folder is necessary yet.



### Folder: `functions`

The `functions` folder will hold our React Hooks, and standalone functions. This should be for `.js` or `.ts` files only. No JSX Elements should be returned from these, only data or React State.

This can also hold any global state management that we want to use, such as React Recoil.

We can also utilize a `utilities.ts` file to hold simple javascript functions such as dates, string processing, or searching through arrays. For the most part, most functions will have their own folder and test file.



### Folder: `mui`

This folder will hold our MUI `theme.ts` file, along with any functions needed to query additional styles. You can build out a full branded theme system here if needed.



### Folder: `pages`

This folder all of our specific page files. This way we can jump directly into a page without having to hunt through a sea of other components.



### Building Components and Hooks

All components and functions/hooks should be built with normal component exports (i.e. no barrel files). Here is an example of a new component and hook:

```text
src/
├─ components/
│  ├─ MyCoolComponent/
│  │  ├─ MyCoolComponent.tsx
│  │  ├─ MyCoolComponent.test.tsx
├─ functions/
│  ├─ useMyCoolHook/
│  │  ├─ useMyCoolHook.ts
│  │  ├─ useMyCoolHook.test.ts
```

This approach keeps all related files together, and makes it much easier to test, import, export, and get stuff working. It also helps reduce context switching, so you don't need navigate through the project to find a related file that might be in a separate folder in the application.

Each component file or hook file can have multiple components if needed. For example, if you have a similar `<Card>` component where one needs to add numbers, and another needs to subtract numbers, both of those can be included in the same file, and exported with different names. For example:

```javascript
// src/components/CardWithMath
export const CardWithAddition = () => {
  // Do something
}

export const CardWithSubtraction = () => {
  // Do something
}


// src/pages/Overview
import { CardWithAddition, CardWithSubtraction } from "src/components/CardWithMath"
```

When working with MUI components that require custom styling, the MUI `theme.ts` file should be used for setting up variations. Here is an example of setting up a variation for the Typography component: (note that the CSS properties are written in JS notation)

```javascript
// src/mui/theme.ts
MuiTypography: {
  variants: [
    {
      props: { variant: 'table-title' },
      style: {
        color: "yellow",
        fontSize: 30,
        backgroundColor: baseTheme.palette.primary.main
      }
    }
  ]
}
```

You can create even create variations off existing variations. In a situation where you'd want to show the same data but with slightly different CSS, we can create a separate JS object to hold the CSS Properties, and then use the spread operator inside the theme setup, like this:

```javascript
// src/mui/theme.ts

// This object contains styles for the Typography variant "table-title"
const stylesTypographyTableTitle = (baseTheme) => {
  return {
    color: "yellow",
    fontSize: 30,
    backgroundColor: baseTheme.palette.primary.main
  }
}

// ... Down the file ...
MuiTypography: {
  variants: [
    {
      props: { variant: 'table-title' },
      style: {
        // We can use our new object from above like so
        ...stylesTypographyTableTitle()
      }
    },
    {
      // And create a new variant with an additional property
      props: { variant: 'table-title', view: "editor" },
      style: {
        // We can use our new object from above like so
        ...stylesTypographyTableTitle(),
        // And add our additional CSS just for the new `view` property
        boxShadow: "5px 5px 5px #000"
      }
    }
  ]
}
```

Notice the syntax starting with `styles`, then including the MUI Property name, and then the variant name in camel-case. `stylesMuiComponentNameVariantName`.

Now to use these components, we call them like so:

```jsx
<Typography variant="table-title">Normal Table Title Here!</Typography>

<Typography variant="table-title" view="editor">Table Title With Box Shadow Here!</Typography>
```

The theme system allows us to create global components without having to create new `styled()` components and import them everywhere. This powerful feature keeps our codebase consistent, lean, and mean.



### Writing Style

Components and function siblings should always be spaced out with at least one line break. For example:

```tsx
// Bad
<Box>
  <Box>lorem ipsum dolar lorem ipsum dolar lorem ipsum dolar lorem ipsum dolar </Box>
  <Box>lorem ipsum dolar lorem ipsum dolar lorem ipsum dolar lorem ipsum dolar </Box>
  <Box>lorem ipsum dolar lorem ipsum dolar lorem ipsum dolar lorem ipsum dolar </Box>
</Box>

// Good
<Box>
  <Box>lorem ipsum dolar lorem ipsum dolar lorem ipsum dolar lorem ipsum dolar </Box>

  <Box>lorem ipsum dolar lorem ipsum dolar lorem ipsum dolar lorem ipsum dolar </Box>

  <Box>lorem ipsum dolar lorem ipsum dolar lorem ipsum dolar lorem ipsum dolar </Box>
</Box>
```

This helps with legibility.

Functions should also be written in normal language as well. Never use single letter variables or shortened words. The compiler will minify all the code anyway, so we can be as verbose as we want. The goal is to make the code clear to new and current developers. For example:

```javascript
// Bad
const ceSave = () => {}

// Good
const handleClientDataSave = () => {}
```

This way we know exactly what function does what. Later in the document, we'll cover code documentation.



### Goals

Upgrades:

- [ ] React 18+
- [ ] Update other packages
- [ ] Remove unused packages
- [ ] Static Site Generation capabilities
- [ ] Monthly package update task. _#noPackageLeftBehind_
- [ ] Implement `.editorconfig`



## Documentation

Any semi-complex part of your code should be documented with single line comments explaining what it does in natural language. Not everything needs a comment, but most functions probably do. Entire functions or components can use JSDoc syntax to give more in-depth information about what the component does. Here are a couple of examples of a good code documenting strategy:

```ts
/**
 * This hook uses a fetch request to get information about the current user whenever they land on the application
 * @param token {String} This is the user's auth token
 * @param isAdmin {Boolean} This controls rendering the user view or the admin view
 */
export const getClientInformation = (token: string, isAdvisor: boolean) => {
    // Check the database with the user's token
    fetch(`api here`)

    // Check that the response was valid and contains the right information
    if(!stuff) {}

    // Check if admin status before returning
    if(data.status && isAdmin) {}

    // Return the final object
    return data;
  }
```

In this example, we use JSDoc syntax to define the entire function. We can use this in tandem with Typescript to force type checking. Once we get into the function, we switch to single line comments. Although the example has comments on each line, that doesn't mean they're required for each line.

When creating new variables such as:

```ts
const userEmail: string = "";
```

It most likely doesn't need a comment explaining what that is. If the const is more esoteric, then including a comment might be helpful. When in doubt, include a comment. Better to document than have to answer a slack message a few days later about the purpose of a variable.



## Testing

We use a combination of Unit Tests and E2E testing to make sure our application runs perfectly. We currently have React Testing Library and Jest installed in our application for unit tests, and they cover a wide variety of custom components. The goal is to eventually move to MUI and offload most of those tests to the library. This will speed up our site and allow us to only focus on the content instead of worrying about the functionality.

For now, when building a new component, try to add `data-testid=""` to places such as the main container, intermediate content, and other specially-rendered content. This way we can access that element with Jest and Cypress (covered in the next section), without worrying about where it is in the DOM Tree.

When writing `data-testid`, the format should look like this: `FileName_ComponentName`. An example might look like this:

```jsx
const MyNewComponent = () => {
  const [showAddress, setShowAddress] = React.useState(false);

  return (
    <Box data-testid="MyNewComponent_Container">
      <Typography>Hello World</Typography>

      {showAddress ? (
        <Box data-testid="MyNewComponent_AddressBox">123 Main Street, Cool Town USA</Box>
      ) : (
        <Button data-testid="MyNewComponent_AddressButton">Click Here For Your Address</Button>
      )}

      <Typography>Other Content here...</Typography>
    </Box>
  )
}
```

Notice how not all components have a `data-testid`. Just the container and the two elements in the ternary statement. This will allow us to fully test each "state" with Jest and Cypress.



### Current Blockers

?



## Cypress

Cypress will be our main E2E testing suite and will be able to navigate through the application just as a user would. For each feature we build, a cypress test should be added and documented. When building the cypress test, a link to the Jira ticket should be added in the comments.

When code is merged to the `develop` branch, Cypress will automatically run in Azure DevOps and report back any issues. Every component we build should use a unique `data-testid` so that we don't have to worry about multiple id issues.



### Goals

Outline Cypress folder structure



## DevOps

A goal might be to get off of the legacy `release` system and move the production deployment into the standard pipeline system for Azure DevOps.

Get Cypress running in the pipeline as well.


## Design System

This project is being migrated over to use MUI as its design system.

We can also use this strategy to incrementally roll out Material UI components and A/B test them with the design team in real time, without having to wait for long deployments and setup. Building the design system in tandem will allow us to iterate quickly.

Since we'll be utilizing an external, and formal design system, this will also eliminate a significant amount of testing required for these components, since the design system itself features a whole suite of unit tests.



## Todo List

### Confluence

There are several dated files in Confluence that need to be modified, consolidated, or removed. We will keep track of them in this document until they've been completed.

#### Remove

- [ ] Confluence file abcxyz: https://atlassian.net


### Helpful Links

- [MUI Component List - https://mui.com/material-ui/](https://mui.com/material-ui/)
- [MUI Figma Document - https://mui.com/store/items/figma-react/](https://mui.com/store/items/figma-react/)
- [Ascii Tree Generator - https://ascii-tree-generator.com/](https://ascii-tree-generator.com/)
- [Tips on Writing Code Comments - https://stackoverflow.blog/2021/12/23/best-practices-for-writing-code-comments/](https://stackoverflow.blog/2021/12/23/best-practices-for-writing-code-comments/)
- [StackBlitz: Quick Cloud-based PoCs - https://stackblitz.com/](https://stackblitz.com/)
- [Slack - https://app.slack.com/](https://app.slack.com/)
- [Github - https://github.com/](https://github.com/)



## New Developers Start Here

### Required tools:

[Latest LTS version of NodeJS - https://nodejs.org/en](https://nodejs.org/en)


### Getting Started

Clone the project and then run:

```bash
npm install
```

Then to compile the project and start the project:

```bash
npm start
```

And after a few seconds, the site will be ready to be accessed.

The local environment will look like this: [http://localhost:3000]


### IDE Support

It is recommended to utilize a full-feature IDE such as [WebStorm](https://www.jetbrains.com/webstorm/).



## PR Rules

When you create your PR, name them starting with the ticket number, and then a description or title. For example:

`JIRA-123 Added New Dashboard`
