import { IMovie } from "models/entertainment";

export const movies: IMovie[] = [
    {
        id: "1",
        name: "Avengers: Endgame",
        releaseDate: "2019-04-26",
        ratingImdb: "8.4",
        ratingRottenTomatoes: "94%",
        ratingAudience: "90%",
        imgPoster: "https://egoamo.co.za/cdn/shop/products/Avengers_-_End_Game_800x.jpg?v=1558989681",
        imgBackground: "https://example.com/avengers-endgame-background.jpg",
        genres: ["Action", "Adventure", "Sci-Fi"],
        cast: [
            { name: "Tony Stark / Iron Man", actorId: "1" },
            { name: "Steve Rogers / Captain America", actorId: "2" },
            { name: "Thor", actorId: "3" },
            { name: "Bruce Banner / Hulk", actorId: "5" },
            { name: "Natasha Romanoff / Black Widow", actorId: "4" },
            { name: "Thanos", actorId: "7" },
            { name: "Peter Parker / Spider-Man", actorId: "10" },
            { name: "T'Challa / Black Panther", actorId: "11" },
            { name: "Gamora", actorId: "12" },
            { name: "Peter Quill / Star-Lord", actorId: "13" },
            { name: "Drax the Destroyer", actorId: "14" },
            { name: "Rocket Raccoon", actorId: "15" },
            { name: "Groot", actorId: "16" },
            { name: "Wanda Maximoff / Scarlet Witch", actorId: "17" },
            { name: "Doctor Strange", actorId: "18" },
            { name: "Loki", actorId: "19" },
            { name: "Bucky Barnes / Winter Soldier", actorId: "20" }
        ]
    },
    {
        id: "2",
        name: "Avengers: Infinity War",
        releaseDate: "2018-04-27",
        ratingImdb: "8.4",
        ratingRottenTomatoes: "85%",
        ratingAudience: "91%",
        imgPoster: "https://egoamo.co.za/cdn/shop/products/InfinityWars_800x.jpg?v=1637907877",
        imgBackground: "https://example.com/avengers-infinity-war-background.jpg",
        genres: ["Action", "Adventure", "Sci-Fi"],
        cast: [
            { name: "Tony Stark / Iron Man", actorId: "1" },
            { name: "Steve Rogers / Captain America", actorId: "2" },
            { name: "Thor", actorId: "3" },
            { name: "Bruce Banner / Hulk", actorId: "5" },
            { name: "Natasha Romanoff / Black Widow", actorId: "4" },
            { name: "Thanos", actorId: "7" },
            { name: "Peter Parker / Spider-Man", actorId: "10" },
            { name: "T'Challa / Black Panther", actorId: "11" },
            { name: "Gamora", actorId: "12" },
            { name: "Peter Quill / Star-Lord", actorId: "13" },
            { name: "Drax the Destroyer", actorId: "14" },
            { name: "Rocket Raccoon", actorId: "15" },
            { name: "Groot", actorId: "16" },
            { name: "Wanda Maximoff / Scarlet Witch", actorId: "17" },
            { name: "Doctor Strange", actorId: "18" },
            { name: "Loki", actorId: "19" },
            { name: "Bucky Barnes / Winter Soldier", actorId: "20" }
        ]
    },
    {
        id: "4",
        name: "Avengers: Age of Ultron",
        releaseDate: "2015-05-01",
        ratingImdb: "7.3",
        ratingRottenTomatoes: "76%",
        ratingAudience: "83%",
        imgPoster: "https://i.pinimg.com/originals/00/c0/47/00c0477cb40c779a46f1ca424db31dce.jpg",
        imgBackground: "https://example.com/avengers-age-of-ultron-background.jpg",
        genres: ["Action", "Adventure", "Sci-Fi"],
        cast: [
            { name: "Tony Stark / Iron Man", actorId: "1" },
            { name: "Steve Rogers / Captain America", actorId: "2" },
            { name: "Thor", actorId: "3" },
            { name: "Natasha Romanoff / Black Widow", actorId: "4" },
            { name: "Bruce Banner / Hulk", actorId: "5" },
            { name: "Clint Barton / Hawkeye", actorId: "6" },
            { name: "James Rhodes / War Machine", actorId: "1" }, // Should be a new actor with a different ID
            { name: "Pietro Maximoff / Quicksilver", actorId: "24" },
            { name: "Wanda Maximoff / Scarlet Witch", actorId: "17" },
            { name: "Vision", actorId: "25" },
            { name: "Ultron", actorId: "23" },
            { name: "Nick Fury", actorId: "21" }
        ]
    },
    {
        id: "3",
        name: "The Avengers",
        releaseDate: "2012-05-04",
        ratingImdb: "8.0",
        ratingRottenTomatoes: "91%",
        ratingAudience: "92%",
        imgPoster: "https://i0.wp.com/easyflipframes.com/wp-content/uploads/2011/09/avengers-fan-made-themadbutcher.jpg?ssl=1",
        imgBackground: "https://example.com/avengers-2012-background.jpg",
        genres: ["Action", "Adventure", "Sci-Fi"],
        cast: [
            { name: "Tony Stark / Iron Man", actorId: "1" },
            { name: "Steve Rogers / Captain America", actorId: "2" },
            { name: "Thor", actorId: "3" },
            { name: "Natasha Romanoff / Black Widow", actorId: "4" },
            { name: "Bruce Banner / Hulk", actorId: "5" },
            { name: "Clint Barton / Hawkeye", actorId: "6" },
            { name: "Loki", actorId: "19" },
            { name: "Nick Fury", actorId: "21" },
            { name: "Maria Hill", actorId: "22" }
        ]
    },
    {
        id: "5",
        name: "Deadpool",
        releaseDate: "2016-02-12",
        ratingImdb: "8.0",
        ratingRottenTomatoes: "85%",
        ratingAudience: "90%",
        imgPoster: "https://i.ebayimg.com/images/g/cQkAAOSwa~BYUdFS/s-l400.jpg",
        imgBackground: "https://example.com/deadpool-2016-background.jpg",
        genres: ["Action", "Comedy"],
        cast: [
            { name: "Wade Wilson / Deadpool", actorId: "26" },
            { name: "Vanessa Carlysle", actorId: "27" },
            { name: "Weasel", actorId: "28" },
            { name: "Colossus", actorId: "29" },
            { name: "Negasonic Teenage Warhead", actorId: "30" },
            { name: "Ajax", actorId: "31" }
            // ... other actors ...
        ]
    },
    {
        id: "6",
        name: "Deadpool 2",
        releaseDate: "2018-05-18",
        ratingImdb: "7.7",
        ratingRottenTomatoes: "84%",
        ratingAudience: "85%",
        imgPoster: "https://oyster.ignimgs.com/wordpress/stg.ign.com/2018/03/Deadpool-2-International-Poster.jpg",
        imgBackground: "https://example.com/deadpool-2-background.jpg",
        genres: ["Action", "Comedy"],
        cast: [
            { name: "Wade Wilson / Deadpool", actorId: "26" },
            { name: "Vanessa Carlysle", actorId: "27" },
            { name: "Weasel", actorId: "28" },
            { name: "Colossus", actorId: "29" },
            { name: "Negasonic Teenage Warhead", actorId: "30" },
            { name: "Cable", actorId: "7" },
            { name: "Domino", actorId: "32" },
            { name: "Firefist", actorId: "33" }
            // ... other actors ...
        ]
    },
    {
        id: "7",
        name: "Deadpool 3",
        releaseDate: "2024-07-26",
        ratingImdb: "N/A",
        ratingRottenTomatoes: "N/A",
        ratingAudience: "N/A",
        imgPoster: "https://egoamo.co.za/cdn/shop/files/Deadpool_Wolverine_800x.jpg?v=1722339169",
        imgBackground: "https://example.com/deadpool-3-background.jpg",
        genres: ["Action", "Comedy"],
        cast: [
            { name: "Wade Wilson / Deadpool", actorId: "26" },
            { name: "Vanessa Carlysle", actorId: "27" },
            { name: "Weasel", actorId: "28" },
            { name: "Colossus", actorId: "29" },
            { name: "Cable", actorId: "7" },
            { name: "Domino", actorId: "32" },
            { name: "Wolverine", actorId: "34" } // New actor
            // ... other actors ...
        ]
    },
    {
        id: "8",
        name: "Spider-Man: Homecoming",
        releaseDate: "2017-07-07",
        ratingImdb: "7.4",
        ratingRottenTomatoes: "92%",
        ratingAudience: "87%",
        imgPoster: "https://example.com/spiderman-homecoming-poster.jpg",
        imgBackground: "https://example.com/spiderman-homecoming-background.jpg",
        genres: ["Action", "Adventure"],
        cast: [
            { name: "Peter Parker / Spider-Man", actorId: "35" }, // New actor
            { name: "Tony Stark / Iron Man", actorId: "1" }, // Previously listed
            { name: "Adrian Toomes / Vulture", actorId: "36" }, // New actor
            { name: "Ned Leeds", actorId: "37" }, // New actor
            { name: "Aunt May", actorId: "38" } // New actor
            // ... other actors ...
        ]
    },
    {
        id: "9",
        name: "Spider-Man: Far From Home",
        releaseDate: "2019-07-02",
        ratingImdb: "7.5",
        ratingRottenTomatoes: "90%",
        ratingAudience: "95%",
        imgPoster: "https://example.com/spiderman-far-from-home-poster.jpg",
        imgBackground: "https://example.com/spiderman-far-from-home-background.jpg",
        genres: ["Action", "Adventure"],
        cast: [
            { name: "Peter Parker / Spider-Man", actorId: "35" },
            { name: "Nick Fury", actorId: "21" }, // Previously listed
            { name: "Quentin Beck / Mysterio", actorId: "39" }, // New actor
            { name: "Ned Leeds", actorId: "37" },
            { name: "Aunt May", actorId: "38" },
            { name: "MJ", actorId: "40" } // New actor
            // ... other actors ...
        ]
    },
    {
        id: "10",
        name: "Spider-Man: No Way Home",
        releaseDate: "2021-12-17",
        ratingImdb: "8.3",
        ratingRottenTomatoes: "93%",
        ratingAudience: "98%",
        imgPoster: "https://example.com/spiderman-no-way-home-poster.jpg",
        imgBackground: "https://example.com/spiderman-no-way-home-background.jpg",
        genres: ["Action", "Adventure"],
        cast: [
            { name: "Peter Parker / Spider-Man", actorId: "35" },
            { name: "Doctor Strange", actorId: "9" }, // Previously listed
            { name: "MJ", actorId: "40" },
            { name: "Ned Leeds", actorId: "37" },
            { name: "May Parker", actorId: "38" },
            { name: "Otto Octavius / Doctor Octopus", actorId: "41" } // New actor
            // ... other actors ...
        ]
    },
    {
        id: "11",
        name: "X-Men",
        releaseDate: "2000-07-14",
        ratingImdb: "7.4",
        ratingRottenTomatoes: "82",
        ratingAudience: "83",
        imgPoster: "https://example.com/xmen.jpg",
        imgBackground: "https://example.com/xmen_bg.jpg",
        genres: ["Action", "Sci-Fi"],
        cast: [
            { name: "Professor Charles Xavier", actorId: "31" }, // Patrick Stewart
            { name: "Magneto", actorId: "32" }, // Ian McKellen
            { name: "Wolverine", actorId: "34" }, // Hugh Jackman (already defined)
            { name: "Jean Grey", actorId: "6" }, // Previously defined actor
            // ... other roles
        ],
    },
    {
        id: "12",
        name: "X2: X-Men United",
        releaseDate: "2003-05-02",
        ratingImdb: "7.4",
        ratingRottenTomatoes: "85",
        ratingAudience: "85",
        imgPoster: "https://example.com/x2.jpg",
        imgBackground: "https://example.com/x2_bg.jpg",
        genres: ["Action", "Sci-Fi"],
        cast: [
            { name: "Professor Charles Xavier", actorId: "31" }, // Patrick Stewart
            { name: "Magneto", actorId: "32" }, // Ian McKellen
            { name: "Wolverine", actorId: "34" }, // Hugh Jackman
            // ... other roles
        ],
    },
    {
        id: "13",
        name: "X-Men: The Last Stand",
        releaseDate: "2006-05-26",
        ratingImdb: "6.7",
        ratingRottenTomatoes: "57",
        ratingAudience: "61",
        imgPoster: "https://example.com/xmen_last_stand.jpg",
        imgBackground: "https://example.com/xmen_last_stand_bg.jpg",
        genres: ["Action", "Sci-Fi"],
        cast: [
            { name: "Professor Charles Xavier", actorId: "31" }, // Patrick Stewart
            { name: "Magneto", actorId: "42" }, // Ian McKellen
            { name: "Wolverine", actorId: "34" }, // Hugh Jackman
            { name: "Jean Grey", actorId: "6" }, // Previously defined actor
            // ... other roles
        ],
    },
    {
        id: "14",
        name: "X-Men: First Class",
        releaseDate: "2011-06-03",
        ratingImdb: "7.7",
        ratingRottenTomatoes: "86",
        ratingAudience: "87",
        imgPoster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYEvgLNTtjei39pEo7MPU6BNgew55Rkv__Xg&s",
        imgBackground: "https://example.com/xmen_first_class_bg.jpg",
        genres: ["Action", "Sci-Fi"],
        cast: [
            { name: "Professor Charles Xavier", actorId: "33" }, // James McAvoy
            { name: "Magneto", actorId: "44" }, // Michael Fassbender
            { name: "Mystique", actorId: "35" }, // Jennifer Lawrence
            { name: "Beast", actorId: "37" }, // Nicholas Hoult
            { name: "Sebastian Shaw / Black King", actorId: "55" }
            // ... other roles
        ],
    },
    {
        id: "15",
        name: "X-Men: Days of Future Past",
        releaseDate: "2014-05-23",
        ratingImdb: "7.9",
        ratingRottenTomatoes: "90",
        ratingAudience: "91",
        imgPoster: "https://example.com/xmen_days_future_past.jpg",
        imgBackground: "https://example.com/xmen_days_future_past_bg.jpg",
        genres: ["Action", "Sci-Fi"],
        cast: [
            { name: "Professor Charles Xavier", actorId: "31" }, // Patrick Stewart
            { name: "Young Charles Xavier", actorId: "33" }, // James McAvoy
            { name: "Magneto", actorId: "42" }, // Ian McKellen
            { name: "Young Magneto", actorId: "44" }, // Michael Fassbender
            { name: "Wolverine", actorId: "34" }, // Hugh Jackman
            // ... other roles
        ],
    },
    {
        id: '16',
        name: 'X-Men: Apocalypse',
        releaseDate: '2016-05-27',
        ratingImdb: '6.9',
        ratingRottenTomatoes: '47%',
        ratingAudience: '65%',
        imgPoster: 'https://image.tmdb.org/t/p/original/xmen-apocalypse-poster.jpg',
        imgBackground: 'https://image.tmdb.org/t/p/original/xmen-apocalypse-bg.jpg',
        genres: ['Action', 'Adventure', 'Sci-Fi'],
        cast: [
            { name: 'Professor Charles Xavier', actorId: '1' }, // James McAvoy
            { name: 'Magneto / Erik Lehnsherr', actorId: '2' }, // Michael Fassbender
            { name: 'Raven / Mystique', actorId: '3' }, // Jennifer Lawrence
            { name: 'Apocalypse / En Sabah Nur', actorId: '10' }, // Oscar Isaac
            { name: 'Jean Grey', actorId: '4' }, // Sophie Turner
            { name: 'Cyclops / Scott Summers', actorId: '11' }, // Tye Sheridan
            { name: 'Storm / Ororo Munroe', actorId: '12' }, // Alexandra Shipp
            { name: 'Quicksilver / Peter Maximoff', actorId: '13' }, // Evan Peters
            { name: 'Beast / Hank McCoy', actorId: '5' }, // Nicholas Hoult
        ],
    },
    {
        id: '17',
        name: 'Dark Phoenix',
        releaseDate: '2019-06-07',
        ratingImdb: '5.7',
        ratingRottenTomatoes: '22%',
        ratingAudience: '64%',
        imgPoster: 'https://image.tmdb.org/t/p/original/dark-phoenix-poster.jpg',
        imgBackground: 'https://image.tmdb.org/t/p/original/dark-phoenix-bg.jpg',
        genres: ['Action', 'Adventure', 'Drama'],
        cast: [
            { name: 'Jean Grey / Phoenix', actorId: '4' }, // Sophie Turner
            { name: 'Professor Charles Xavier', actorId: '1' }, // James McAvoy
            { name: 'Magneto / Erik Lehnsherr', actorId: '2' }, // Michael Fassbender
            { name: 'Raven / Mystique', actorId: '3' }, // Jennifer Lawrence
            { name: 'Cyclops / Scott Summers', actorId: '11' }, // Tye Sheridan
            { name: 'Storm / Ororo Munroe', actorId: '12' }, // Alexandra Shipp
            { name: 'Quicksilver / Peter Maximoff', actorId: '13' }, // Evan Peters
            { name: 'Beast / Hank McCoy', actorId: '5' }, // Nicholas Hoult
        ],
    },
    {
        id: "18",
        name: "Thor",
        releaseDate: "2011-05-06",
        ratingImdb: "7.0",
        ratingRottenTomatoes: "77",
        ratingAudience: "76",
        imgPoster: "https://example.com/thor.jpg",
        imgBackground: "https://example.com/thor_bg.jpg",
        genres: ["Action", "Fantasy"],
        cast: [
            { name: "Thor", actorId: "42" }, // Chris Hemsworth
            { name: "Loki", actorId: "19" }, // Tom Hiddleston
            { name: "Jane Foster", actorId: "44" }, // Natalie Portman
            { name: "Heimdall", actorId: "45" }, // Idris Elba
            { name: "Odin", actorId: "46" }, // Anthony Hopkins
            // ... other roles
        ],
    },
    {
        id: "19",
        name: "Thor: The Dark World",
        releaseDate: "2013-11-08",
        ratingImdb: "6.9",
        ratingRottenTomatoes: "66",
        ratingAudience: "76",
        imgPoster: "https://example.com/thor_dark_world.jpg",
        imgBackground: "https://example.com/thor_dark_world_bg.jpg",
        genres: ["Action", "Fantasy"],
        cast: [
            { name: "Thor", actorId: "3" }, // Chris Hemsworth
            { name: "Loki", actorId: "19" }, // Tom Hiddleston
            { name: "Jane Foster", actorId: "44" }, // Natalie Portman
            { name: "Heimdall", actorId: "45" }, // Idris Elba
            { name: "Odin", actorId: "46" }, // Anthony Hopkins
            // ... other roles
        ],
    },
    {
        id: "20",
        name: "Thor: Ragnarok",
        releaseDate: "2017-11-03",
        ratingImdb: "7.9",
        ratingRottenTomatoes: "93",
        ratingAudience: "87",
        imgPoster: "https://example.com/thor_ragnarok.jpg",
        imgBackground: "https://example.com/thor_ragnarok_bg.jpg",
        genres: ["Action", "Fantasy"],
        cast: [
            { name: "Thor", actorId: "3" }, // Chris Hemsworth
            { name: "Loki", actorId: "19" }, // Tom Hiddleston
            // ... other roles
        ],
    },
    {
        id: "21",
        name: "Thor: Love and Thunder",
        releaseDate: "2022-07-08",
        ratingImdb: "6.3",
        ratingRottenTomatoes: "64",
        ratingAudience: "77",
        imgPoster: "https://example.com/thor_love_thunder.jpg",
        imgBackground: "https://example.com/thor_love_thunder_bg.jpg",
        genres: ["Action", "Fantasy"],
        cast: [
            { name: "Thor", actorId: "3" }, // Chris Hemsworth
            { name: "Jane Foster", actorId: "44" }, // Natalie Portman
            // ... other roles
        ],
    },
    {
        id: "22",
        name: "Ant-Man",
        releaseDate: "2015-07-17",
        ratingImdb: "7.3",
        ratingRottenTomatoes: "83",
        ratingAudience: "86",
        imgPoster: "https://example.com/antman.jpg",
        imgBackground: "https://example.com/antman_bg.jpg",
        genres: ["Action", "Sci-Fi"],
        cast: [
            { name: "Scott Lang / Ant-Man", actorId: "38" }, // Paul Rudd
            { name: "Hope van Dyne", actorId: "39" }, // Evangeline Lilly
            { name: "Hank Pym", actorId: "40" }, // Michael Douglas
            { name: "Luis", actorId: "41" }, // Michael Peña
            // ... other roles
        ],
    },
    {
        id: "23",
        name: "Ant-Man and The Wasp",
        releaseDate: "2018-07-06",
        ratingImdb: "7.0",
        ratingRottenTomatoes: "87",
        ratingAudience: "80",
        imgPoster: "https://example.com/antman_wasp.jpg",
        imgBackground: "https://example.com/antman_wasp_bg.jpg",
        genres: ["Action", "Sci-Fi"],
        cast: [
            { name: "Scott Lang / Ant-Man", actorId: "38" }, // Paul Rudd
            { name: "Hope van Dyne / The Wasp", actorId: "39" }, // Evangeline Lilly
            { name: "Hank Pym", actorId: "40" }, // Michael Douglas
            { name: "Luis", actorId: "41" }, // Michael Peña
            // ... other roles
        ],
    },
    {
        id: "24",
        name: "Ant-Man and The Wasp: Quantumania",
        releaseDate: "2023-02-17",
        ratingImdb: "6.2",
        ratingRottenTomatoes: "47",
        ratingAudience: "82",
        imgPoster: "https://example.com/antman_quantumania.jpg",
        imgBackground: "https://example.com/antman_quantumania_bg.jpg",
        genres: ["Action", "Sci-Fi"],
        cast: [
            { name: "Scott Lang / Ant-Man", actorId: "38" }, // Paul Rudd
            { name: "Hope van Dyne / The Wasp", actorId: "39" }, // Evangeline Lilly
            { name: "Hank Pym", actorId: "40" }, // Michael Douglas
            // ... other roles
        ],
    },
];