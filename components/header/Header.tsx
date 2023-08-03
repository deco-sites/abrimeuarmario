import Modals from "$store/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";

import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";


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
  /** @title Logo */
  logo?: { src: Image; alt: string };
}

function Header(
  {
    alerts,
    searchbar: _searchbar,
    products,
    navItems = [],
    suggestions,
    logo,
  }: Props,
) {
  const searchbar = { ..._searchbar, products, suggestions };
  return (
    <>
      {/* class="absolute h-28 bg-transparent w-screen" */}

      <header>
        <div class="bg-default w-full">
          <Alert alerts={alerts} />
          <div
            class={`fixed w-full z-50  ease-in duration-300 hover:bg-[#ffffff] `}
            
          >
            <Navbar items={navItems} searchbar={searchbar} logo={logo} />
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
