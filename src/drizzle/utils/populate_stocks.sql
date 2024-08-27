INSERT INTO stocks (
    id, symbol, name, price, change_1hr, change_24hr, change_1wk, change_1mth, change_all, 
    team, country, points, championship_pos, color, category, image
) VALUES
(1, 'VER', 'Max Verstappen', 8423.56, -2.75, -3.45, 5.67, -2.34, 45.67, 'Red Bull Racing', 'Netherlands', 295, 1, '3671C6', 'f1', 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png'),
(2, 'PER', 'Sergio Perez', 7642.12, 1.34, 2.56, -1.45, 3.67, -34.56, 'Red Bull Racing', 'Mexico', 139, 7, '3671C6', 'f1', 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png'),
(3, 'LEC', 'Charles Leclerc', 6923.45, -0.56, 1.34, -2.45, 5.78, 23.45, 'Ferrari', 'Monaco', 192, 3, 'E10600', 'f1', 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png'),
(4, 'ALO', 'Fernando Alonso', 5834.67, 2.34, -1.23, 0.78, -4.56, 12.34, 'Aston Martin', 'Spain', 50, 9, '0E583F', 'f1', 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png'),
(5, 'RUS', 'George Russell', 5234.23, -1.56, 2.34, -0.67, 1.23, 34.56, 'Mercedes', 'United Kingdom', 122, 8, '6CD3BF', 'f1', 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png'),
(6, 'HAM', 'Lewis Hamilton', 6123.45, 3.67, -2.34, 1.23, -5.67, 23.45, 'Mercedes', 'United Kingdom', 154, 6, '6CD3BF', 'f1', 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png'),
(7, 'STR', 'Lance Stroll', 4987.34, -0.45, 1.56, -2.34, 4.56, 34.56, 'Aston Martin', 'Canada', 24, 10, '0E583F', 'f1', 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png'),
(8, 'SAI', 'Carlos Sainz', 5432.12, 2.34, -1.45, 0.67, -4.56, 12.34, 'Ferrari', 'Spain', 50, 9, 'E10600', 'f1', 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png'),
(9, 'GAS', 'Pierre Gasly', 4892.45, -1.23, 2.34, -0.56, 3.67, 45.67, 'Alpine', 'France', 8, 14, '2293D1', 'f1', 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png'),
(10, 'OCO', 'Esteban Ocon', 4783.23, 3.67, -2.34, 1.23, -5.67, 23.45, 'Alpine', 'France', 5, 17, '2293D1', 'f1', 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png'),
(11, 'NOR', 'Lando Norris', 5643.45, -1.56, 2.34, -0.67, 4.56, 34.56, 'McLaren', 'United Kingdom', 225, 2, 'FF8700', 'f1', 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png'),
(12, 'PIA', 'Oscar Piastri', 5156.18, 1.54, 1.47, 0.83, 4.16, 14.12, 'McLaren', 'Australia', 179, 4, 'FF8700', 'f1', 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png'),
(13, 'HUL', 'Nico Hulkenberg', 4678.34, 2.34, -1.45, 0.67, -4.56, 12.34, 'Haas F1 Team', 'Germany', 22, 11, 'B6BABD', 'f1', 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png'),
(14, 'BOT', 'Valtteri Bottas', 5234.12, -1.23, 2.34, -0.56, 3.67, 45.67, 'Kick Sauber', 'Finland', 0, 21, '900000', 'f1', 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valbot01.png'),
(15, 'ZHO', 'Zhou Guanyu', 4897.23, 3.67, -2.34, 1.23, -5.67, 23.45, 'Kick Sauber', 'China', 0, 19, '900000', 'f1', 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GUAZHO01_Guanyu_Zhou/guazho01.png'),
(16, 'TSU', 'Yuki Tsunoda', 4789.34, -1.56, 2.34, -0.67, 4.56, 34.56, 'RB', 'Japan', 22, 12, '2B4562', 'f1', 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png'),
(17, 'ALB', 'Alex Albon', 4672.12, 2.34, -1.45, 0.67, -4.56, 12.34, 'Williams Racing', 'Thailand', 4, 18, '37BEDD', 'f1', 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png'),
(18, 'MAG', 'Kevin Magnussen', 4567.34, -1.23, 2.34, -0.56, 3.67, 45.67, 'Haas F1 Team', 'Denmark', 5, 16, 'B6BABD', 'f1', 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/K/KEVMAG01_Kevin_Magnussen/kevmag01.png');
(19, 'RIC', 'Daniel Riccardo', 512.34, -1.23, 2.34, -0.56, 3.67, 45.67, 'RB', 'Australia', 12, 13, '2B4562', 'f1', 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/DANRIC01.png');
(20, 'SAR', 'Logan Sargeant', 118.34, -1.23, 2.34, -0.56, 3.67, 45.67, 'Williams Racing', 'United States', 0, 20, '37BEDD', 'f1', 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/LOGSAR01.png');