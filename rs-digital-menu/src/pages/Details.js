import React from 'react';
import CategoryItem from '../components/CategoryItem';
import ContactInfo from '../components/ContactInfo';
import PageLayout from '../components/PageLayout';
import { LocationIcon, PhoneIcon, WhatsAppIcon } from '../assets/icons/icons';

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
    <PageLayout
      logo="https://cdn.builder.io/api/v1/image/assets/TEMP/d24f49f81cd93cf18334d85ef533cb403a2f208335450fcf3b049a6967026575?apiKey=fb34ab8a011e440488e897e0309c7345&"
      background="https://cdn.builder.io/api/v1/image/assets/TEMP/8ccaaab001102f9e76126bc224d5141549923fc432d12bdfb2ca44c060cbe19d?apiKey=fb34ab8a011e440488e897e0309c7345&"
      
      title="Repostería Sánchez"
      
      contactInfo={
        <>
          <ContactInfo
          icon={LocationIcon}
          text="Av. 26 de Agosto #9, Puerto Plata, Rep. Dom"
        />
        <ContactInfo
          icon={PhoneIcon}
          text="(829) 910-9672 / (849) 859-6945"
        />
        <ContactInfo
          icon={WhatsAppIcon}
          text="(809) 586-8851"
        />
        </>
      }
      description="Pastelería especializada en la creación de tartas matrimoniales"
    >
      <h2 className="mt-4 text-lg font-medium text-custom-primary">
        <span className="text-stone-500">Categorías /</span> Cumpleaños
      </h2>
      <div className="flex flex-col gap-3.5 mt-5">
        {categoryItems.map((item, index) => (
          <CategoryItem key={index} {...item} />
        ))}
      </div>
    </PageLayout>
  );
}

export default Details;
