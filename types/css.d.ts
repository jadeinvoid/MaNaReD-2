declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.css" {}

declare module "*.css?url" {
  export default string;
}

/** Vite ?url imports with path segments (e.g. ../src/app/styles.css?url). */
declare module "*?url" {
  export default string;
}
