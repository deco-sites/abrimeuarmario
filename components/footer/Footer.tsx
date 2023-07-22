import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import type { ComponentChildren } from "preact";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
};

export type Item = StringItem | IconItem;

export type Section = {
  label: string;
  children: Item[];
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <span class="text-[#000000]">
      {isIcon(item)
        ? (
          <div class="border-base-100 border border-solid py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={0.01}
            />
          </div>
        )
        : (
          <a href={item.href}>
            {item.label}
          </a>
        )}
    </span>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`py-6 px-4 sm:py-12 sm:px-0 ${_class}`}>{children}</div>;
}

export interface Props {
  sections?: Section[];
}

function Footer({ sections = [] }: Props) {
  return (
    <footer class="w-full flex flex-col divide-primary-content">
      <div className="container newsletter bg-bg-newsletter py-12 pl-20 pr-12 rounded-lg mb-[30px]">
        <FooterContainer>
          <Newsletter />
        </FooterContainer>
      </div>
      <div class="bg-[#F8F8F8]">
        <div class="container w-full flex flex-col divide-primary-content">
          <FooterContainer>
            {/* Desktop view */}
            <ul class="hidden sm:grid grid-cols-4">
              {sections.map((section) => (
                <li>
                  <div>
                    <span class="font-bold text-xl text-[#000000]">
                      {section.label}
                    </span>

                    <ul
                      class={`flex text-sm font-normal text-[#000000] ${
                        isIcon(section.children[0]) ? "flex-row" : "flex-col"
                      } gap-2 pt-2 flex-wrap`}
                    >
                      {section.children.map((item) => (
                        <li>
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
              <div class="social-item mt-10">
                <span class="font-bold text-xl text-[#000000]">
                  Redes Sociais
                </span>
                <ul class="flex items-center justify-start gap-2">
                  <li>
                    <a
                      href="https://www.instagram.com/deco.cx"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram logo"
                    >
                      <Icon
                        class="text-primary-content"
                        width={32}
                        height={32}
                        id="Instagram"
                        strokeWidth={1}
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://www.deco.cx/discord"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Discord logo"
                    >
                      <Icon
                        class="text-primary-content"
                        width={32}
                        height={32}
                        id="Discord"
                        strokeWidth={5}
                      />
                    </a>
                  </li>
                </ul>
              </div>
              
            </ul>

            {/* Mobile view */}
            <ul class="flex flex-col sm:hidden sm:flex-row gap-4">
              {sections.map((section) => (
                <li>
                  <span class="text-sm font-normal text-[#000000]">
                    <details open>
                      <summary class="block text-xl font-bold text-[#000000]">
                        {section.label}
                      </summary>

                      <ul
                        class={`flex ${
                          isIcon(section.children[0]) ? "flex-row" : "flex-col"
                        } gap-2 pt-2`}
                      >
                        {section.children.map((item) => (
                          <li>
                            <SectionItem item={item} />
                          </li>
                        ))}
                      </ul>
                    </details>
                  </span>
                </li>
              ))}
            </ul>
          </FooterContainer>
        </div>
      </div>

      <div>
        <div class="container w-full">
          <FooterContainer class="flex justify-between w-full">
            <div className="md:hidden">
              <summary class="block text-xl font-bold text-[#000000]">
                Formas de pagamento
              </summary>
            </div>
            <span class="flex flex-col  md:flex md:flex-row items-center justify-between text-[#000000] w-full">
              Todos direitos reservados - Abri Meu Armário | Rua da Paz, 1601,
              Chácara Santo Antônio (Zona Sul) 04713-002-São Paulo-SP
              21.705.143/0001-79{" "}
              <a
                href="https://www.deco.cx"
                aria-label="powered by https://www.deco.cx"
              >
                {/* <Icon id="Deco" height={20} width={60} strokeWidth={0.01} /> */}
                <Icon id="Uncode" height={36} width={79} strokeWidth={0.01} />
              </a>
            </span>
          </FooterContainer>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
