# ErasmusMobility
Visualizing Erasmus mobility as part of our Datavisualization Course at Aarhus university.
Authors: Anna Schierholz, Nina Ziegenbein, Emilie Grenth
To make it work:
1. "npm install" 
2. install rollup "npm install @rollup/plugin-buble --save-dev"
3. run "rollup -c" to see your changes
4. Open with Live Server extension (VS Code) to avoid other errors

## Column Names
| Column Name | Explanation |
| ---: | :--- |
| Year | The academic year in form 20xx-20xx |
| Duration | The duration of exchange in days |
| FieldOfEducation | The field of education (no categories)|
| Gender | Gender of participant [Female, Male, Undefined] |
| Age | Age of participant |
| SendCountry | Country Code of sending country |
| SendCity | Cityname of sending city |
| SendOrga | Name of sending organisation |
| SendOrgaCode | Code of sending organisation |
| RecCountry | Country Code of receiving country |
| RecCity | Cityname of receiving city |
| RecOrga | Name of receiving organisation |
| RecOrgaCode | Code of receiving organisation |


## Country Codes
|Code|Country|Code|Country|Code|Country|Code|Country
| --- | --- | --- | --- | --- | --- | --- | --- |
| BE | Belgium | EL | Greece | LT | Lithuania | PT | Portugal |
| BG | Bulgaria | ES | Spain | LU | Luxembourg | RO | Romania |
| CZ | Czechia | FR | France | HU | Hungary | SI | Slovenia|
| DK | Denmark | HR | Croatia | MT | Malta | SK | Slovakia |
| DE | Germany | IT | Italy | NL | Netherlands | FI | Finland |
| EE | Estonia | CY | Cyprus | AT | Austria | SE | Sweden |
| IE | Ireland | LV | Latvia | PL | Poland |
|||||||
| IS | Iceland | NO | Norway | LI | Liechtenstein | CH | Switzerland |
| UK | United Kingdom | MK  | North Macedonia | RS | Serbia | TR | Turkey |
| AL | Albania |  BA | Bosnia and Herzegovina | XK | Kosovo | ME | Montenegro |
| BY | Belarus | MD | Moldova | UA | Ukraine | RU | Rumania |