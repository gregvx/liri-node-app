# liri-node-app

This CLI app takes four possible commands and gets info from third part APIs and displays it to the command line.

The four possible commands are:
* concert-this
* spotify-this-song
* movie-this
* do-what-it-says

The command concert-this takes any band or artist as a paramater and checks the BandInTown API for upcomming tour dates. For example, the command "concert-this taylor swift" would return tour dates for Taylor Swift.

The command spotify-this-song takes a song title as a paramater and returns information from spotify about who performs the song, what album it was on, and a link to listen to the song on spotify. For example, 
"spotify-this-song porcelina" tells you the song was on the album *Melloncollie and the Infinite Sadness* by The Smashing Pumpkins.

The command movie-this takes a movie title as a paramater and returns information on a movie matching that title. For Example, "movie-this bambi" would tell you that the movie was released in 1942 and has a 90% rating on Rotten Tomatoes.

The command do-what-it-says takes no paramaters. It looks at a file in the same directory as the app called random.txt and reads in instructions from the file. The file must contain one of the first three commands shown here, and a paramater. The command and paramater must be separated by a single comma and the paramater must be in double quotes.