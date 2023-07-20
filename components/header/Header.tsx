import Modals from "$store/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { RefObject } from "preact";

import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: Image;
    alt?: string;
  };
}

export interface Props {
  alerts: string[];
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: LoaderReturnType<Product[] | null>;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;
}

function Header(
  {
    alerts,
    searchbar: _searchbar,
    products,
    navItems = [],
    suggestions,
  }: Props,
) {
  const searchbar = { ..._searchbar, products, suggestions };
  const [scrollingMode, setScrollingMode] = useState(window.pageYOffset > 0);
  const menuRef: RefObject<HTMLDivElement> = useRef(null);
  const [isNotHome, setIsNotHome] = useState(true);

  // lógica do scrolling mode
  function handleScroll() {
    const menu = menuRef.current;
    if (menu && window.pageYOffset > 0) {
      setScrollingMode(true);
    } else if (menu) {
      setScrollingMode(false);
    }
  }

  useEffect(() => {
    globalThis.addEventListener("scroll", handleScroll);
    setIsNotHome(globalThis.location.pathname !== "/");
  }, []);

  const topDistance = scrollingMode ? "top-0 bg-primary" : "top-[24px]";
  const headerClass = isNotHome ? `h-[87px] sm:h-[${headerHeight}]` : "";

  return (
    <>
      {/* class="absolute h-28 bg-transparent w-screen" */}

      <header class={``}>
        <div class="bg-default w-full">
          <Alert alerts={alerts} />
          <div
            class={`fixed w-full z-50 ${topDistance} ease-in duration-300 hover:bg-[#ffffff] `}
            ref={menuRef}
          >
            <Navbar items={navItems} searchbar={searchbar} />
          </div>
        </div>

        <Modals
          menu={{ items: navItems }}
          searchbar={searchbar}
        />
      </header>
    </>
  );
}

export default Header;
