type PItype = {
   [key: string]: Ptype
}

type Ptype = {
    name: string,
    price: number,
    image_path: string,
    description: string,
    color: Array<string>,
}

const ProductsInfo: PItype = {
    dummyProduct: {
        name: "dummyProduct",
        price: 10000,
        image_path: "/logo_small.svg",
        description: "これからはItsumoarigatoneが流行ります。",
        color: ["#ff2356"],
    },
    green_tray: {
        name: "緑のトレー",
        price: 7000,
        image_path: "/logo_small.svg",
        description: "大人な雰囲気の深緑色トレー\n無造作に置かれた鍵などをこのトレーの上に載せたらそれだけで整理されたように見えます。",
        color: ["#ff2356"],
    },
};
export default ProductsInfo;