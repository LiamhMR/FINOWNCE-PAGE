# Entrega Parcial 2 - ID PROYECTO : 23
# Integrantes
# Jose Toloza
# Miguel Silva
# Leandro Maureira

# Temp running on LOCAL SERVER
# [ Instalar global http server npm ] npm install --global http-server 
# [ Levantar servidor local ] http-server -a localhost -p 8000 -c-1

# INTERFACES EN FIGMA: https://www.figma.com/file/MULyhpFnoLV6xsMBERyPwm/Men%C3%BA?node-id=30%3A2

# 
# CRUD

# READ:
# En el summary del usuario debería existir un resumen de todas las cuentas que posee el usuario contando el valor total de ellas. Además debe dividirse entre cuentas bancarias e inversiones y en el caso de las inversiones debiese mostrarse el porcentaje de rentabilidad así como las ganancias o pérdidas totales.
# Además, el usuario puede ver los movimientos que ha registrado individualmente en cuentas y sus movimientos, así también puede revisar sus inversiones, entre ellas, si se ha definido alguna inversión en acciones o en criptoactivos, si se especificó de cual se trata debe mostrarse en el valor del activo y su transformación a CLP, por ejemplo; 20 USDT= $17.200. Si se trata de un deposito a plazo fijo el sistema debe calcular su valor actual en CLP conforme a los datos de ingreso dado(% de interés).

# CREATE
# El usuario es capaz de crear un registro de contabilidad de cuentas siendo estas de tipo Corriente, Vista o Ahorro, en caso de ser de ahorro debe especificarse el tipo de ajuste(% interés o UF). También debieran admitirse billeteras digitales como TENPO o PAYPAL. 
# El usuario es capaz de crear un registro de contabilidad de inversiones, siendo estas Fondo Mutuo, Depósito a plazo fijo, acciones o criptomonedas. 

# UPDATE
# El usuario puede modificar los registros de sus cuentas, añadiendo movimiento de ingresos o de egresos. Además es posible re-especificar el saldo total de alguna cuenta y se añadirá como egreso la diferencia.
# El usuario puede modificar el registro de sus inversiones, añadiendo movimientos de compra o venta en el caso de algún activo de acción o criptoactivo, esta se puede especificar en CLP o en cantidad. O también puede añadir una compra a precio límite en cuyo caso debe especificarse posteriormente si se concreta.

# DELETE
# El usuario puede eliminar un registro de contabilidad de una cuenta.
# El usuario puede eliminar un registro de contabilidad de un activo.

# ESTADO ACTUAL DE LA PÁGINA
# El menú de la página se adapta al tamaño de la pantalla, haciéndolo más comodo para pantallas de móviles, además se programaron funciones que permitan acomodar los elementos de la página al cambiar de modo. Por ahora solo implementado totalmente para los elementos de HOME.
# La página posee en inicio un menú principal de 5 botones, 4 de ellas corresponden a otras páginas y el último corresponde al idioma de presentación, este puede seleccionarse entre inglés y español, y el JS lo leera desde un JSON, todos los JSON de idioma deben presentar la misma estructura.

# START - HOME
# El Home contiene la presentación de la página con una brebe introducción y una invitación al registro.
# START - ABOUT US & CONTACT US
# El ABOUT US debe contener una muestra del equipo de FINOWNCE.
# El CONTACT US debe mostrar un pequeño formulario de envío de mensajes con campos formales de correo, nombre de empresa, asunto.
# START - LOGIN & SIGN UP
# El LOGIN contiene el formulario de inicio de sesión y además entregar un botón de REGISTRO que lo redirija a la página de registro. Dado que no existe un backend integrado (aún), se utiliza un usuario de prueba, y como 'One Use Token' se utiliza un string estático, idealmente con el backend debiese asignarse un URL dinámico para saber con qué usuario se trata.
# user: testuser1 | password:123456
# El SIGN UP posee el formulario de registro, este tiene integrado todos los checks requeridos para su correcto ingreso, además de un formateo automático del campo RUT para sean submiteados con el formato XX.XXX.XXX-X, y focusear campos vacíos o mal ingresado, entre otros.
#
# Se encuentra el menú de usuario con el RESUMEN,CUENTAS,INVERSIONES,CONTACTO DE SOPORT,CERRADO DE SESIÓN y CAMBIO DE IDIOMA.
# USUARIO-SUMMARY
# Hasta el momento el summary es la única página del lado del usuario que se encuentra medianamente funcional. Y realiza lectura de los datos de pruebas del JSON de datos de prueba (tempdb.json) para realizar el resumen y las sumas. La tabla es creada por JS.
