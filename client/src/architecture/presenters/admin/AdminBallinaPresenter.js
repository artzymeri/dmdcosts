import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";
import Cookies from "js-cookie";
import {EmojiTransportationRounded, EuroRounded, HomeRounded, MailRounded, Person2Rounded} from "@mui/icons-material";

@injectable()
class AdminBallinaPresenter {

    vm = {
        ballinaGridItems: [
            {
                id: 1,
                title: 'Klientët',
                subTitle1: 'Totali:',
                value1: '431234',
                subTitle2: 'Klientët Javorë:',
                value2: '+ 4234',
                buttonText: 'Klientët',
                route: './klientët',
                icon: <Person2Rounded sx={{height: '20px', width: '20px'}}/>
            },
            {
                id: 2,
                title: 'Çarkullimi ditorë',
                subTitle1: 'Pagesat:',
                value1: '34112€',
                subTitle2: 'Net Profiti:',
                value2: '5331€',
                buttonText: 'Porositë',
                route: './porosite',
                icon: <EuroRounded sx={{height: '20px', width: '20px'}}/>
            },
            {
                id: 3,
                title: 'Porositë',
                subTitle1: 'Totali:',
                value1: '10312',
                subTitle2: 'Porositë Ditore:',
                value2: '338',
                buttonText: 'Porositë',
                route: './porosite',
                icon: <MailRounded sx={{height: '20px', width: '20px'}}/>
            },
            {
                id: 4,
                title: 'Shoferët',
                subTitle1: 'Totali:',
                value1: '15',
                subTitle2: 'Të Angazhuar Sot:',
                value2: '13',
                buttonText: 'Shoferët',
                route: './shoferët',
                icon: <EmojiTransportationRounded sx={{height: '20px', width: '20px'}}/>
            },
        ],
        newPostings: [
            {
                id: 1,
                buyers_info: {
                    name: 'Filan Fisteku',
                    phone_number: '+38349111222',
                    state: 'Kosovë',
                    city: 'Vushtrri',
                    full_address: 'Rruga Dëshmorët'
                },
                product_info: {
                    price: '12',
                    description: 'Pasqyrë delikate me dimensione 120cm me 100cm.',
                    status: 'undone'
                }
            },
            {
                id: 2,
                buyers_info: {
                    name: 'Arben Beqiri',
                    phone_number: '+38349123456',
                    state: 'Shqipëri',
                    city: 'Tiranë',
                    full_address: 'Bulevardi Dëshmorët e Kombit'
                },
                product_info: {
                    price: '15',
                    description: 'Karrige druri me mbështetëse komode.',
                    status: 'done'
                }
            },
            {
                id: 3,
                buyers_info: {
                    name: 'Gentiana Berisha',
                    phone_number: '+38349124567',
                    state: 'Maqedoni e Veriut',
                    city: 'Tetovë',
                    full_address: 'Rruga Iliria'
                },
                product_info: {
                    price: '25',
                    description: 'Orë muri e bardhë me dizajn minimalist.',
                    status: 'progress'
                }
            },
            {
                id: 4,
                buyers_info: {
                    name: 'Leutrim Gashi',
                    phone_number: '+38349178901',
                    state: 'Kosovë',
                    city: 'Prishtinë',
                    full_address: 'Rruga Luan Haradinaj'
                },
                product_info: {
                    price: '40',
                    description: 'Frigorifer me kapacitet 250L.',
                    status: 'done'
                }
            },
            {
                id: 5,
                buyers_info: {
                    name: 'Rina Shehu',
                    phone_number: '+38349145678',
                    state: 'Kosovë',
                    city: 'Ferizaj',
                    full_address: 'Rruga Adem Jashari'
                },
                product_info: {
                    price: '8',
                    description: 'Set gotash kristali me 6 copa.',
                    status: 'undone'
                }
            },
            {
                id: 6,
                buyers_info: {
                    name: 'Erion Krasniqi',
                    phone_number: '+38349123478',
                    state: 'Shqipëri',
                    city: 'Durrës',
                    full_address: 'Rruga e Plazhit'
                },
                product_info: {
                    price: '120',
                    description: 'Shtëpi portative për fëmijë.',
                    status: 'progress'
                }
            },
            {
                id: 7,
                buyers_info: {
                    name: 'Adelina Hoti',
                    phone_number: '+38349191234',
                    state: 'Maqedoni e Veriut',
                    city: 'Gostivar',
                    full_address: 'Rruga e Çlirimit'
                },
                product_info: {
                    price: '10',
                    description: 'Libër me tregime për fëmijë.',
                    status: 'done'
                }
            },
            {
                id: 8,
                buyers_info: {
                    name: 'Shkëlzen Aliu',
                    phone_number: '+38349165432',
                    state: 'Shqipëri',
                    city: 'Shkodër',
                    full_address: 'Bulevardi Republika'
                },
                product_info: {
                    price: '9',
                    description: 'Mbulesë tavoline për çdo sezon.',
                    status: 'undone'
                }
            },
            {
                id: 9,
                buyers_info: {
                    name: 'Emirjeta Krasniqi',
                    phone_number: '+38349187654',
                    state: 'Kosovë',
                    city: 'Gjilan',
                    full_address: 'Rruga e Kumanovës'
                },
                product_info: {
                    price: '60',
                    description: 'Lavamani për banjo.',
                    status: 'progress'
                }
            },
            {
                id: 10,
                buyers_info: {
                    name: 'Veton Rexhepi',
                    phone_number: '+38349134567',
                    state: 'Kosovë',
                    city: 'Pejë',
                    full_address: 'Rruga Mbretëresha Teuta'
                },
                product_info: {
                    price: '200',
                    description: 'Shtrat dopio me dyshek ortopedik.',
                    status: 'done'
                }
            },
            {
                id: 11,
                buyers_info: {
                    name: 'Linda Shala',
                    phone_number: '+38349123488',
                    state: 'Shqipëri',
                    city: 'Vlorë',
                    full_address: 'Lagjja Uji i Ftohtë'
                },
                product_info: {
                    price: '75',
                    description: 'Laptop i përdorur me gjendje të mirë.',
                    status: 'undone'
                }
            },
            {
                id: 12,
                buyers_info: {
                    name: 'Alban Morina',
                    phone_number: '+38349128475',
                    state: 'Kosovë',
                    city: 'Mitrovicë',
                    full_address: 'Lagjja Iliridë'
                },
                product_info: {
                    price: '35',
                    description: 'Printer me ngjyra dhe skaner.',
                    status: 'progress'
                }
            },
            {
                id: 13,
                buyers_info: {
                    name: 'Dorina Kastrati',
                    phone_number: '+38349134456',
                    state: 'Maqedoni e Veriut',
                    city: 'Strugë',
                    full_address: 'Rruga e Liqenit'
                },
                product_info: {
                    price: '110',
                    description: 'Mobilje për dhomë gjumi me komodinë.',
                    status: 'done'
                }
            },
            {
                id: 14,
                buyers_info: {
                    name: 'Agron Bunjaku',
                    phone_number: '+38349123654',
                    state: 'Kosovë',
                    city: 'Prizren',
                    full_address: 'Rruga Jusuf Gërvalla'
                },
                product_info: {
                    price: '22',
                    description: 'Pjesë për kompjuter, ram 16GB.',
                    status: 'undone'
                }
            },
            {
                id: 15,
                buyers_info: {
                    name: 'Arta Dervishi',
                    phone_number: '+38349178956',
                    state: 'Kosovë',
                    city: 'Gjakovë',
                    full_address: 'Lagjja Ali Ibra'
                },
                product_info: {
                    price: '70',
                    description: 'Shtëpi druri për kafshë shtëpiake.',
                    status: 'progress'
                }
            },
            {
                id: 16,
                buyers_info: {
                    name: 'Ilir Mustafa',
                    phone_number: '+38349156789',
                    state: 'Shqipëri',
                    city: 'Berat',
                    full_address: 'Lagjja Mangalem'
                },
                product_info: {
                    price: '5',
                    description: 'Dërrasa për prerjen e ushqimeve.',
                    status: 'done'
                }
            },
            {
                id: 17,
                buyers_info: {
                    name: 'Arlinda Beqiri',
                    phone_number: '+38349134521',
                    state: 'Kosovë',
                    city: 'Suharekë',
                    full_address: 'Rruga Sharr'
                },
                product_info: {
                    price: '13',
                    description: 'Mbajtëse telefoni për makinë.',
                    status: 'undone'
                }
            },
            {
                id: 18,
                buyers_info: {
                    name: 'Driton Haziri',
                    phone_number: '+38349198234',
                    state: 'Maqedoni e Veriut',
                    city: 'Kumanovë',
                    full_address: 'Rruga e Dibrës'
                },
                product_info: {
                    price: '9',
                    description: 'Çantë për laptop deri në 15 inch.',
                    status: 'progress'
                }
            },
            {
                id: 19,
                buyers_info: {
                    name: 'Flaka Thaçi',
                    phone_number: '+38349128765',
                    state: 'Kosovë',
                    city: 'Deçan',
                    full_address: 'Rruga e Dëshmorëve'
                },
                product_info: {
                    price: '42',
                    description: 'Lampë e vogël për zyre.',
                    status: 'done'
                }
            },
            {
                id: 20,
                buyers_info: {
                    name: 'Fatjon Ahmeti',
                    phone_number: '+38349190871',
                    state: 'Shqipëri',
                    city: 'Korçë',
                    full_address: 'Rruga Rinia'
                },
                product_info: {
                    price: '20',
                    description: 'Paletë për pastrimin e oborrit.',
                    status: 'undone'
                }
            }
        ]
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
            ballinaGridItems: computed,
            newPostings: computed
        });
    }


    get ballinaGridItems() {
        return this.vm.ballinaGridItems
    }

    get newPostings() {
        return this.vm.newPostings;
    }

}

export default AdminBallinaPresenter;