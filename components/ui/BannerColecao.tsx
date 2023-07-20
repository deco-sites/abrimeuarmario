import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Banner {
  srcMobile: LiveImage;
  srcDesktop?: LiveImage;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  title?: string;
  /**
   * @description Default is 2 for mobile and all for desktop
   */
  itemsPerLine: {
    /** @default 2 */
    mobile?: 1 | 2;
    /** @default 4 */
    desktop?: 1 | 2 | 4 | 6 | 8;
  };
  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  banners: Banner[];
}

const RADIUS_MOBILE = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
};

const RADIUS_DESKTOP = {
  "none": "sm:rounded-none",
  "sm": "sm:rounded-sm",
  "md": "sm:rounded-md",
  "lg": "sm:rounded-lg",
  "xl": "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  "full": "sm:rounded-full",
};

export default function BannnerColecao({
  title,
  itemsPerLine,

  borderRadius,
  banners = [],
}: Props) {
  return (
    <section class="container w-full px-4 md:px-0 mx-auto">
      <div class={`row-span-1`}>
        {title &&
          (
            <div class="py-6 md:py-0 md:pb-[40px] flex items-center mt-6">
              <h2 class="text-lg leading-5 font-semibold uppercase">
                {title}
              </h2>

              <div class="bg-[#e5e5ea] h-[1px] w-full ml-4"></div>
            </div>
          )}
      </div>
      <div class="grid  grid-cols-[50%_minmax(25%,_25%)_25%]  gap-4">
        {banners.map(({ href, srcMobile, srcDesktop, alt }) => (
          <div className="item first:row-span-4 first:grid">
            <a
              href={href}
              class={`overflow-hidden ${
                RADIUS_MOBILE[borderRadius.mobile ?? "none"]
              } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
            >
              <Picture>
                <Source
                  media="(max-width: 767px)"
                  src={srcMobile}
                  width={100}
                  height={100}
                />
                <Source
                  media="(min-width: 768px)"
                  src={srcDesktop ? srcDesktop : srcMobile}
                  width={411}
                  height={540}
                />
                <img
                  class="w-full"
                  sizes="(max-width: 640px) 50vw, 30vw"
                  src={srcMobile}
                  alt={alt}
                  decoding="async"
                  loading="lazy"
                />
              </Picture>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
