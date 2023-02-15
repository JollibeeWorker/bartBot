const Discord = require('discord.js');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { Pagination } = require('discordjs-button-embed-pagination');
require('dotenv').config();
const TOKEN = process.env.TOKEN;

const client = new Discord.Client({
	intents: ['GUILDS', 'GUILD_MESSAGES'],
	
});


client.on('messageCreate', message => {

    function bart(stn) {
        
        prefix = '!b';
        if (!message.content.startsWith(prefix)) return;
        if ( message.content.startsWith(prefix)) {

            let before = 'https://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=';
            let after = '&key=QAPP-5DEQ-9W4T-DWEI&json=y';
            let search = before.concat(stn, after);
            let stn2 = stn;
            console.log(stn2);
            let before2 = 'http://api.bart.gov/api/etd.aspx?cmd=etd&orig=';
            let after2 = '&key=QAPP-5DEQ-9W4T-DWEI&json=y';
            let search2 = before2.concat(stn2, after2);



            const fetchStn = fetch(search)
                .then(function(main) {
                    return main.json();
                })
                .then(function(main) {
                    return main.root.stations; 
                });

            const fetchArr = fetch(search2)
                .then(function(main2) {
                    return main2.json();
                })
                .then(function(main2) {
                    console.log(main2.root.station)
                    return main2.root.station;
                    
                });

            
            
            const id = () => {
                fetchStn.then((a) => {
                    let stationNamet = a.station.name;
                    let stationName = stationNamet.concat('');
                    console.log(stationName);
                    let address = a.station.address;
                    let city = a.station.city;
                    let state = 'CA';
                    let zipcode = a.station.zipcode;
                    let space = ' ';
                    let comma = ',';
                    let stationAddress = address.concat(comma, space, city, space, state, space, zipcode);
                    fetchArr.then((b) => {
                        
                        let arr = [];

                        let test = 0;
                        for (let i = 0; i < b[0].etd.length; i++) {
                            let min = '';
                            let minTemp = '';
                            let bound = '';
                            for (let j = 0; j < b[0].etd[test].estimate.length; j++) {
                                minTemp = minTemp.concat(b[0].etd[test].estimate[j].minutes, ', ');
                                bound = b[0].etd[test].estimate[j].direction;
                                min = minTemp.slice(0, -2);
                            }
                            
                            const i = new MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle('BART Station Info')
                                .setAuthor({ name: 'BART Bot', iconURL: 'https://i.imgur.com/12x1tD6.png' })
                                .addFields(
                                    { name: 'Station:', value: stationName, inline: true },
                                    { name: 'Address:', value: stationAddress, inline: true},
                                )
                                .addField('\u200b', '\u200b', true)
                                .addFields(
                                    { name: `Destination (${bound}bound):`, value: b[0].etd[test].destination, inline: true},
                                    { name: 'ETA (in minutes):', value: min, inline: true},
                                )
                                .setTimestamp();
                            arr[test] = i
                            test = test + 1;
                        }

                        new Pagination(message.channel, arr, "page").paginate();
    
                    })


                })
            }
            
            id();

        }
    }


    let input = message.content;
    let input2 = input.slice(3);
    let input3 = input2.toLowerCase();
    console.log(input3);

    if (input3 == 'fremont' || input3 == 'frmt') {
        console.log(input3);
        bart('frmt');
    } else if (input3 == '12th st oakland city center' || input3 == '12th st. oakland city center' || input3 == 'city center' || input3 == '12th' || input3 == 'oakland city center') {
        bart('12th');
    } else if (input3 == '16th st mission' || input3 == '16th st. mission' || input3 == '16th mission' || input3 == '16th') {
        bart('16th');
    } else if (input3 == '19th st oakland' || input3 == '19th st. oakland' || input3 == '19th oakland' || input3 == '19th') {
        bart('frmt');
    } else if (input3 == '24th st mission' || input3 == '24th st. mission' || input3 == '24th mission' || input3 == '24th') {
        bart('24th');
    } else if (input3 == 'antioch' || input3 == 'antc') {
        bart('antc');
    } else if (input3 == 'balboa park' || input3 == 'balboa' || input3 == 'balb') {
        bart('balb');
    } else if (input3 == 'bay fair' || input3 == 'san leandro' || input3 == 'leandro' || input3 == 'bayf') {
        bart('bayf');
    } else if (input3 == 'berryessa' || input3 == 'berry' || input3 == 'north san jose' || input3 == 'bery') {
        bart('bery');
    } else if (input3 == 'castro valley' || input3 == 'castro' || input3 == 'valley' || input3 == 'cast') {
        bart('cast');
    } else if (input3 == 'civic center' || input3 == 'civic' || input3 == 'civc') {
        bart('civc');
    } else if (input3 == 'coliseum' || input3 == 'oco' || input3 == 'o.co' || input3 == 'oakland airport' || input3 == 'cols') {
        bart('cols');
    } else if (input3 == 'colma' || input3 == 'colm') {
        bart('colm');
    } else if (input3 == 'concord' || input3 == 'conc') {
        bart('conc');
    } else if (input3 == 'daly city' || input3 == 'daly' || input3 == 'filipino' || input3 == 'filipino land') {
        bart('daly');
    } else if (input3 == 'downtown berkeley' || input3 == 'dbrk') {
        bart('dbrk');
    } else if (input3 == 'dublin/plesanton' || input3 == 'dublin' || input3 == 'plesanton' || input3 == 'dubl') {
        bart('dubl');
    } else if (input3 == 'el cerrito del norte' || input3 == 'del norte' || input3 == 'norte' || input3 == 'deln') {
        bart('deln');
    } else if (input3 == 'el cerrito plaza' || input3 == 'plaza' || input3 == 'plza' || input3 == 'cerrito plaza') {
        bart('plza');
    } else if (input3 == 'Embarcadero' || input3 == 'Embarc' || input3 == 'embr') {
        bart('embr');
    } else if (input3 == 'fruitvale' || input3 == 'ftvl') {
        bart('ftvl');
    } else if (input3 == 'glen park' || input3 == 'glen') {
        bart('glen');
    } else if (input3 == 'hayward' || input3 == 'hayw') {
        bart('hayw');
    } else if (input3 == 'lafayette' || input3 == 'lafa' || input3 == 'lafy') {
        bart('lafy');
    } else if (input3 == 'lake merritt' || input3 == 'merritt' || input3 == 'lake') {
        bart('lake');
    } else if (input3 == 'mcar' || input3 == 'macarthur' || input3 == 'mac arthur' || input3 == 'mac' || input3 == 'arthur') {
        bart('mcar');
    } else if (input3 == 'mlbr' || input3 == 'millbrae' || input3 == 'mill') {
        bart('mlbr');
    } else if (input3 == 'milpitas' || input3 == 'mlpt' || input3 == 'milp') {
        bart('mlpt');
    } else if (input3 == 'montgomery st' || input3 == 'montgomery' || input3 == 'mont' || input3 == 'monty' || input3 == 'montgomery st.') {
        bart('mont');
    } else if (input3 == 'north berkeley' || input3 == 'nbrk') {
        bart('nbrk');
    } else if (input3 == 'north concord' || input3 == 'concord' || input3 == 'martinez' || input3 == 'ncon') {
        bart('ncon');
    } else if (input3 == 'oakl' || input3 == 'oakland intl airport' || input3 == "oakland int'l airport" || input3 == 'oakland airport' || input3 == 'oak airport') {
        bart('oakl');
    } else if (input3 == 'orinda' || input3 == 'orin') {
        bart('orin');
    } else if (input3 == 'pittsburg' || input3 == 'bay point' || input3 == 'pitt' || input3 == 'pittsburg/baypoint' || input3 == 'pittsburg / baypoint' || input3 == 'pittsburg/bay point') {
        bart('pitt');
    } else if (input3 == 'pittsburg center' || input3 == 'pctr') {
        bart('pctr');
    } else if (input3 == 'pleasant hill' || input3 == 'pleasant' || input3 == 'hill' || input3 == 'phil') {
        bart('phil');
    } else if (input3 == 'powell' || input3 == 'powell st.' || input3 == 'powell st' || input3 == 'powl') {
        bart('powl');
    } else if (input3 == 'richmond' || input3 == 'rich') {
        bart('rich');
    } else if (input3 == 'rockridge' || input3 == 'rock' || input3 == 'ridge') {
        bart('rock');
    } else if (input3 == 'san bruno' || input3 == 'bruno' || input3 == 'sbrn') {
        bart('sbrn');
    } else if (input3 == 'san francisco intl airport' || input3 == 'sf airport' || input3 == 'sfo' || input3 == "san francisco int'l airport" || input3 == 'sfia') {
        bart('sfia');
    } else if (input3 == 'san leandro' || input3 == 'leandro' || input3 == 'sanl') {
        bart('sanl');
    } else if (input3 == 'south hayward' || input3 == 'shay') {
        bart('shay');
    } else if (input3 == 'south san francisco' || input3 == 'south sf' || input3 == 'ssan') {
        bart('ssan');
    } else if (input3 == 'ucty' || input3 == 'union city' || input3 == 'uc' || input3 == 'union') {
        bart('ucty');
    } else if (input3 == 'warm springs/south fremont' || input3 == 'warm springs' || input3 == 'south fremont' || input3 == 'warm') {
        bart('warm');
    } else if (input3 == 'walnut creek' || input3 == 'walnut' || input3 == 'creek' || input3 == 'wcrk') {
        bart('wcrk');
    } else if (input3 == 'west dublin' || input3 == 'wdub' || input3 == 'w dublin') {
        bart('wdub');
    } else if (input3 == 'west oakland' || input3 == 'woak' || input3 == 'w oakland' || input3 == 'w oak') {
        bart('woak');
    };

});
    


client.once('ready', () => {
	console.log('Ready!');
})

client.login(TOKEN)

