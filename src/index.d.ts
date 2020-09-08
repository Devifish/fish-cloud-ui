declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare module "js-cookie" {
  interface CookieAttributes {
    expires?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: "strict" | "Strict" | "lax" | "Lax" | "none" | "None";
    [property: string]: any;
  }

  interface CookiesStatic<T extends object = object> {
    defaults: CookieAttributes;
    set(
      name: string,
      value: string | T,
      options?: CookieAttributes
    ): string | undefined;
    get(name: string): string | undefined;
    get(): { [key: string]: string };
    getJSON(name: string): any;
    getJSON(): { [key: string]: any };
    remove(name: string, options?: CookieAttributes): void;
    noConflict?(): CookiesStatic<T>;
    withConverter<TConv extends object>(
      converter:
        | CookieReadConverter
        | { write?: CookieWriteConverter<TConv>; read?: CookieReadConverter }
    ): CookiesStatic<TConv>;
  }

  type CookieWriteConverter<T extends object> = (
    value: string | T,
    name: string
  ) => string;
  type CookieReadConverter = (value: string, name: string) => string;

  declare const Cookies: CookiesStatic;
  export default Cookies;
}
