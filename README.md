This is a list of steps to get a new SvelteKit project up and running using my normal flow

## `package.json`

- [ ] Swap out `"@sveltejs/adapter-auto"` for `"@sveltejs/adapter-netlify": "next",`
- [ ] Optional: [Add in Pocketbase](https://www.npmjs.com/package/pocketbase)
- [ ] Optional: [Add in Slugify](https://www.npmjs.com/package/slugify)

## `svelte.config.js`

- [ ] Update the import to `import adapter from '@sveltejs/adapter-netlify';`

## Create an `.editorconfig` file

```toml
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
