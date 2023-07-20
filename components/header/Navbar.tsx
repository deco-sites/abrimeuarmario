import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import { useEffect, useState } from "preact/hooks";

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center h-16 w-full pl-2 pr-6 gap-2"
      >
        <Buttons variant="menu" />
        <Buttons variant="search" />
        <a
          href="/"
          class="flex-grow inline-flex items-center"
          style={{ minHeight: navbarHeight }}
          aria-label="Store logo"
        >
          <Icon id="Logo" width={126} height={16} />
        </a>

        <div class="flex gap-1">
          <a
            class="btn btn-square btn-ghost w-max "
            href="/login"
            aria-label="Log in"
          >
            <Icon id="User" width={25} height={25} strokeWidth={0.4} />
          </a>
          <Buttons variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div className={`head `}>
        <div class="hidden md:flex flex-row justify-between items-center h-16 w-full pl-2 pr-6">
          <div className="flex-auto">
            <a
              href=""
              className="btn btn-ghost text-text-color font-semibold text-sm normal-case"
            >
              Sobre a Pri
            </a>
            <a
              href=""
              className="btn btn-ghost text-text-color font-semibold text-sm normal-case"
            >
              Looks da Pri
            </a>
          </div>
          <div class="flex-auto w-44">
            <a
              href="/"
              aria-label="Store logo"
              class="block px-4 py-3 w-[160px]"
            >
              <Icon id="Logo" width={126} height={16} />
            </a>
          </div>
          <div class="flex-none w-44 flex items-center justify-end gap-2">
            <Buttons variant="search" />
            <Searchbar searchbar={searchbar} />
            <a
              class="btn btn-square btn-ghost w-max "
              href="/login"
              aria-label="Log in"
            >
              <span>Entrar</span>
              <Icon id="User" width={25} height={25} strokeWidth={0.4} />
            </a>
            {
              /* <a
            class="btn btn-square btn-ghost"
            href="/wishlist"
            aria-label="Wishlist"
          >
            <Icon
              id="Heart"
              size={20}
              strokeWidth={2}
              fill="none"
            />
          </a> */
            }
            <Buttons variant="cart" />
          </div>
        </div>
        <div class="hidden flex-auto md:flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
