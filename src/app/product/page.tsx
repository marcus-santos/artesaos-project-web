'use client';

import React from 'react';
import Header from "@/components/header";
import ProductImage from './components/ProductImage';
import ProductInfo from './components/ProductInfo';

function ProductPage() {
    const productData = {
        title: "Brincos Elegantes",
        price: "R$ 10,00",
        description: "Brincos femininos elegantes, perfeitos para ocasiões especiais. Feitos com materiais de alta qualidade e acabamento refinado.",
        image: "/bijuterias.jpg",
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: productData.title,
                text: `Confira este produto: ${productData.title}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiado para a área de transferência!');
        }
    };

    const handleAddToFavorites = () => {
        console.log('Adicionado aos favoritos');
    };

    const handleContact = () => {
        const message = `Olá! Tenho interesse no produto: ${productData.title}`;
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <main className="bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="flex justify-center md:justify-end items-center object-top p-4">
                            <ProductImage 
                                src={productData.image} 
                                alt={productData.title}
                                className="flex aspect-square max-h-96 justify-center items-center"
                            />
                        </div>
                        
                        <div className="flex flex-col justify-center">
                            <ProductInfo
                                title={productData.title}
                                price={productData.price}
                                description={productData.description}
                                onShare={handleShare}
                                onAddToFavorites={handleAddToFavorites}
                                onContact={handleContact}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProductPage;