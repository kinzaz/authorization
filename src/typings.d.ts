declare module "*.module.scss" {
  const classNames: { readonly [className: string]: string };
  export = classNames;
}

declare module "*.style.scss" {
  const classNames: { readonly [className: string]: string };
  export = classNames;
}
