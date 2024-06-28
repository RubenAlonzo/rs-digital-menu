import React from 'react';
import CategoryItem from '../components/CategoryItem';
import ContactInfo from '../components/ContactInfo';

function Details() {
  const categoryItems = [
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a22331a40edffb09a4ff968ffd2882401e0f937ab1f3a5e301fe6619fe78e6d4?apiKey=fb34ab8a011e440488e897e0309c7345&",
      title: "Bizcocho de Vainilla",
      price: "4,500",
      description: "Relleno con una suave crema batida y fresas frescas y jugosas."
    },
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/5aeb67c733c7f2eaa1e41fcbd6766f989d63840a4ddfa23f19ec745a1dffad4d?apiKey=fb34ab8a011e440488e897e0309c7345&",
      title: "Bizcocho de Zanahoria",
      price: "3,800",
      description: "Relleno con una delicada crema y crujientes nueces."
    },
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a897e0752626a30b7c02a76da924d16f9cb48a889288107711a14f84c88e464a?apiKey=fb34ab8a011e440488e897e0309c7345&",
      title: "Bizcocho de Chocolate",
      price: "4,700",
      description: "Relleno con un exquisito ganache de chocolate, suave y cremoso."
    }
  ];

  return (
    <main className="flex flex-col mx-auto w-full max-w-[480px]">
      <header className="flex overflow-hidden relative flex-col items-start px-16 pt-5 pb-20 w-full aspect-[1.46]">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ccaaab001102f9e76126bc224d5141549923fc432d12bdfb2ca44c060cbe19d?apiKey=fb34ab8a011e440488e897e0309c7345&" alt="Background" className="object-cover absolute inset-0 size-full" />
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d24f49f81cd93cf18334d85ef533cb403a2f208335450fcf3b049a6967026575?apiKey=fb34ab8a011e440488e897e0309c7345&" alt="Logo" className="mb-6 ml-3.5 w-56 max-w-full aspect-[1.85]" />
      </header>
      <section className="flex rounded-t-3xl z-10 flex-col px-5 py-12 mt-0 w-full bg-white rounded-[32px_32px_0px_0px]">
        <h1 className="text-2xl font-bold text-stone-700">Repostería Sánchez</h1>
        <ContactInfo
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/2afb95267d3e18088ec6ea2aef193bf99ce71386b03da037b6d0cb81208a817d?apiKey=fb34ab8a011e440488e897e0309c7345&"
          text="Av. 26 de Agosto #9, Puerto Plata, Rep. Dom"
        />
        <ContactInfo
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/98d99997e6d87825b570b297e2d34a56364f8032bb41edc4cbaba7a368e64869?apiKey=fb34ab8a011e440488e897e0309c7345&"
          text="(829) 910-9672 / (849) 859-6945"
        />
        <ContactInfo
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/7a544637ca15e4da94f703ec672bac2a774345ec8bf67a795bd97277191cf31d?apiKey=fb34ab8a011e440488e897e0309c7345&"
          text="(809) 586-8851"
        />
        <p className="mt-5 text-lg tracking-wide text-stone-700">
          Pastelería especializada en la creación de tartas matrimoniales
        </p>
        <h2 className="mt-7 text-2xl font-medium text-stone-700">
          <span className="text-stone-500">Categorías /</span> Cumpleaños
        </h2>
        <div className="flex flex-col gap-3.5 mt-5">
          {categoryItems.map((item, index) => (
            <CategoryItem key={index} {...item} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Details;
