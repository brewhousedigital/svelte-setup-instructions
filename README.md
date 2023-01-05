This is a list of steps to get a new SvelteKit project up and running using my normal flow

## `package.json`

- [ ] Swap out `"@sveltejs/adapter-auto"` for `"@sveltejs/adapter-netlify": "next",`
- [ ] Add in new Script for `npm start`
- [ ] Optional: Expose the Vite server on the network by adding `--host` to the scripts

### Other `package.json` Things

- [ ] Optional: [Add in Pocketbase](https://www.npmjs.com/package/pocketbase)
- [ ] Optional: [Add in Slugify](https://www.npmjs.com/package/slugify)
- [ ] Optional: [Add in DayJS](https://www.npmjs.com/package/dayjs)

## `svelte.config.js`

- [ ] Update the import to `import adapter from '@sveltejs/adapter-netlify';`

## Create an `.editorconfig` file

```editorconfig
# EditorConfig helps developers define and maintain consistent
# coding styles between different editors and IDEs
# editorconfig.org

root = true


[*]
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
indent_style = space
indent_size = 2
```

## Create a `netlify.toml` file

```toml
[build]
  command = "npm run build"
  publish = "build"
```

## Update `.gitignore`

- [ ] `.idea`
- [ ] `.netlify`


## Webstorm Specific

- [ ] Mark the `static` folder as the Resource Root
- [ ] Run the dev and build commands then mark the output folders as Excluded Resources


# Code Helpers

- [ ] [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [ ] [Bootstrap Icons](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [ ] 
