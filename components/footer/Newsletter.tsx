import { useSignal } from "@preact/signals";
import { Runtime } from "$store/runtime.ts";
import type { JSX } from "preact";

const subscribe = Runtime.create(
  "deco-sites/std/actions/vtex/newsletter/subscribe.ts",
);

function Newsletter() {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div class="flex justify-between flex-col sm:flex-row items-center gap-6 sm:gap-20">
      <div class="flex flex-col gap-2 max-w-[400px]">
        <span class="text-base text-black font-semibold">
          Cadastre-se para receber ofertas e descontos exclusivos
        </span>
        <span class="text-sm font-normal ">
          Inscreva-se para receber novidades, promoções, atualizações de estoque
          e muito mais...
        </span>
      </div>
      <form
        class="font-body text-sm text-black w-full sm:w-[445px] form-control"
        onSubmit={handleSubmit}
      >
        <div class="flex gap-2.5">
          <input
            name="email"
            class="flex-grow input input-primary rounded-none"
            placeholder="Insira seu e-mail"
          />
          <button
            class="btn disabled:loading text-base font-semibold rounded-none text-[#ffffff]"
            disabled={loading}
          >
            Cadastrar-se
          </button>
        </div>
        <div className="text-info text-text-color font-normal pt-3">
          A Abri meu Armário utiliza os seus dados preenchidos conforme a
          finalidade definida na nossa Política de Privacidade. Ao concluir o
          cadastro, você permite o tratamento dos dados pessoais para a
          finalidade proposta.
        </div>
      </form>
    </div>
  );
}

export default Newsletter;
