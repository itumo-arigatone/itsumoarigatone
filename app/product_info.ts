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
    wallet: {
        name: "二つ折り財布",
        price: 15000,
        image_path: "/logo_small.svg",
        description: "二つ折り財布になります。\nルガトーという革を使っています。全体的にちょっとキツめだけれど使っていくうちに馴染むかも？\n小銭入れはありません。",
        color: ["#002e1a"],
    },
    green_tray: {
        name: "緑のトレー",
        price: 7000,
        image_path: "/logo_small.svg",
        description: "大人な雰囲気の深緑色トレー\n無造作に置かれた鍵などをこのトレーの上に載せたらそれだけで整理されたように見えます。",
        color: ["#002e1a"],
    },
    code_clip: {
        name: "本革のコードクリップ 8cm",
        price: 300,
        image_path: "/logo_small.svg",
        description: "本革のコードクリップになります。長さは8cmです。USB type-Cを通しておくことができます。",
        color: ["#002e1a", "#000000"],
    },
};
export default ProductsInfo;