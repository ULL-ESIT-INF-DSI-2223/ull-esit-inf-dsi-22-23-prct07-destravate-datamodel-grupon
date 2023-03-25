# Práctica 7 - DeStravaTe

## Grupo N

### Daniel Jorge Acosta y Saúl Martín García

### alu0101239187@ull.edu.es y alu0101405180@ull.edu.es

## Índice

- [Introducción](https://ull-esit-inf-dsi-2223.github.io/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupon/#introducción)
- [Clases básicas](https://ull-esit-inf-dsi-2223.github.io/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupon/#clases-básicas)
- [Interfaces](https://ull-esit-inf-dsi-2223.github.io/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupon/#interfaces)
- [Colecciones de objetos](https://ull-esit-inf-dsi-2223.github.io/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupon/#colecciones-de-objetos)
- [Bibliografía](https://ull-esit-inf-dsi-2223.github.io/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupon/#bibliografía)

## Introducción

Este proyecto consiste en el modelado de datos de un sistema de información para el almacenamiento de actividades deportivas. Este sistema se encuentra desarrollado en Typescript, tratando de seguir los principios SOLID del diseño orientado a objetos. El proyecto sigue la siguiente estructura de directorios:

- **dist**: Código JavaScript generado
- **docs**: Documentación del código
- **src**: Código fuente TypeScript
  - **classes**: Clases básicas
  - **collections**: Colecciones de clases
  - **databases**: Colecciones utilizadas por **Lowdb** para guardar la información
  - **examples**: Objetos de ejemplo
  - **interfaces**: Interfaces
  - **types**: Tipos
- **tests**: Tests del código fuente TypeScript

Durante la elaboración del sistema, se han utilizado las siguientes herramientas:

- **ESLint** para la comprobación de errores
- **Prettier** para el formateo del código
- **TypeDoc** para la generación automática de documentación del código
- **Mocha** y **Chai** para el desarrollo dirigido por pruebas
- **Instanbul** para la comprobación del cubrimiento del código fuente
- **GitHub Actions** para la integración continua del código ejecutado en **Node.js**, el envío de información de cubrimiento a **Coveralls** y la comprobación de calidad y seguridad del código fuente con **Sonar Cloud**

## Clases básicas

Una vez descrito el proyecto de manera general, comenzaremos tratando las clases básicas del proyecto, encargadas del almacenamiento de la información correspondiente a los distintos elementos del sistema.

### Clase Route

La clase `Route` implementa la interfaz `Stringable` y se utiliza para almacenar los datos de los rutas del sistema y cuenta con los siguientes atributos:

- ID de la ruta. La clase controla que sea positivo.
- Nombre de la ruta.
- Coordenadas del inicio de la ruta. Se puede ver una definición más detallada en el apartado _Clase Coord_.
- Coordenadas del final de la ruta. Se puede ver una definición más detallada en el apartado _Clase Coord_.
- Longitug de la ruta en kilómetros. La clase controla que sea positiva.
- Desnivel medio de la ruta. La clase controla que sea un valor positivo.
- IDs de los usuarios que han realizado la ruta del usuario. La clase elimina los IDs repetidos.
- Tipo de actividad que se puede realizar en la ruta. Se puede ver una definición más detallada en el apartado _Tipo Activity_.
- Calificación media de la ruta. La clase controla que sea positiva.

También posee métodos para la gestión de los atributos que sean colecciones de elementos, estos son:

- `addX`: Añade un elemento a una colección de IDs X, por ejemplo addVisitor para añadir un visitante. El método puede recibir un ID o un objeto al que se le extrae el ID y comprueba que el ID no se encuentre guardado previamente y que sea válido. En caso de que cumpla con estas restricciones, el ID se añade y devuelve `true` y en caso contrario devuelve `false`.
- `removeX`: Elimina un elemento de una colección de IDs X, por ejemplo removeVisitor para eliminar un visitante. El método puede recibir un ID o un objeto al que se le extrae el ID y comprueba que el ID se encuentre guardado previamente. En caso de que lo esté, el ID se elimina y devuelve `true` y en caso contrario devuelve `false`.
- `toString`: Devuelve una representación de los atributos de la ruta en forma de cadena.

### Clase User

La clase `User` implementa la interfaz `Stringable` y se utiliza para almacenar los datos de los usuarios del sistema y cuenta con los siguientes atributos:

- ID o nombre de la cuenta del usuario.
- Nombre del usuario.
- Actividad que realiza el usuario. Se puede ver una definición más detallada en el apartado _Tipo Activity_.
- IDs de los amigos del usuario. La clase elimina los IDs repetidos y controla que un usuario no sea amigo de si mismo.
- IDs de los grupos a los que pertenece el usuario. La clase elimina los IDs repetidos y controla que sean válidos.
- Estadísticas de entrenamiento del usuario. Se puede ver una definición más detallada en el apartado _Clase Statistics_.
- IDs de las rutas favoritas del usuario. La clase elimina los IDs repetidos y controla que sean válidos.
- IDs de los retos activos del usuario. La clase elimina los IDs repetidos y controla que sean válidos.
- Historial del usuario. La clase controla que las fechas no sean futuras y que los IDs de las rutas del historial sean válidos.

También posee métodos para la gestión de los atributos que sean colecciones de elementos, estos son:

- `addX`: Añade un elemento a una colección de IDs X, por ejemplo addFriend para añadir un amigo. El método puede recibir un ID o un objeto al que se le extrae el ID y comprueba que el ID no se encuentre guardado previamente y que sea válido. En caso de que cumpla con estas restricciones, el ID se añade y devuelve `true` y en caso contrario devuelve `false`.
- `removeX`: Elimina un elemento de una colección de IDs X, por ejemplo removeFriend para eliminar un amigo. El método puede recibir un ID o un objeto al que se le extrae el ID y comprueba que el ID se encuentre guardado previamente. En caso de que lo esté, el ID se elimina y devuelve `true` y en caso contrario devuelve `false`.
- `toString`: Devuelve una representación de los atributos del usuario en forma de cadena.

### Clase Group

La clase `Group` implementa la interfaz `Stringable` y se utiliza para almacenar los datos de los grupos del sistema y cuenta con los siguientes atributos:

- ID del grupo. La clase controla que sea positivo.
- Nombre del grupo.
- IDs de los miembros del grupo. La clase elimina los IDs repetidos.
- Estadísticas de entrenamiento totales del grupo. Es la suma de las estadísticas de los miembros del grupo. Se puede ver una definición más detallada en el apartado _Clase Statistics_.
- Clasificación de los miembros del grupo. La clase ordena los usuarios en base a sus kilómetros anuales.
- IDs de las rutas favoritas del grupo. La clase elimina los IDs repetidos y controla que sean válidos.
- Historial del grupo. La clase controla que las fechas no sean futuras y que los IDs de las rutas del historial sean válidos.

También posee métodos para la gestión de los atributos que sean colecciones de elementos, estos son:

- `addX`: Añade un elemento a una colección de IDs X, por ejemplo addMember para añadir un miembro. El método puede recibir un ID o un objeto al que se le extrae el ID y comprueba que el ID no se encuentre guardado previamente y que sea válido. En caso de que cumpla con estas restricciones, el ID se añade y devuelve `true` y en caso contrario devuelve `false`.
- `removeX`: Elimina un elemento de una colección de IDs X, por ejemplo removeMember para eliminar un miembro. El método puede recibir un ID o un objeto al que se le extrae el ID y comprueba que el ID se encuentre guardado previamente. En caso de que lo esté, el ID se elimina y devuelve `true` y en caso contrario devuelve `false`.
- `toString`: Devuelve una representación de los atributos del grupo en forma de cadena.

### Clase Challenge

La clase `Challenge` implementa la interfaz `Stringable` y se utiliza para almacenar los datos de los retos del sistema y cuenta con los siguientes atributos:

- ID del reto. La clase controla que sea positivo.
- Nombre del reto.
- IDs de la rutas que forman parte del reto. La clase elimina los IDs repetidos y controla que sean válidos.
- Tipo de actividad del reto. Se puede ver una definición más detallada en el apartado _Tipo Activity_.
- Kilómetros totales a realizar. La clase controla que sean positivos.
- IDs de los usuario que están realizando el reto. La clase elimina los IDs repetidos y controla que sean válidos.

También posee métodos para la gestión de los atributos que sean colecciones de elementos, estos son:

- `addX`: Añade un elemento a una colección de IDs X, por ejemplo addRoute para añadir una ruta. El método puede recibir un ID o un objeto al que se le extrae el ID y comprueba que el ID no se encuentre guardado previamente y que sea válido. En caso de que cumpla con estas restricciones, el ID se añade y devuelve `true` y en caso contrario devuelve `false`.
- `removeX`: Elimina un elemento de una colección de IDs X, por ejemplo removeRoute para eliminar una ruta. El método puede recibir un ID o un objeto al que se le extrae el ID y comprueba que el ID se encuentre guardado previamente. En caso de que lo esté, el ID se elimina y devuelve `true` y en caso contrario devuelve `false`.
- `toString`: Devuelve una representación de los atributos del reto en forma de cadena.

### Tipo Activity

El tipo `Activity` define los tipos de actividades existentes en el sistema y es una cadena que puede tomar los valores "Running" y "Bicycle".

### Clase Coord

La clase `Coord` implementa la interfaz `Stringable` y se utiliza para almacenar los datos de las coordenadas de las rutas y cuenta con los siguientes atributos:

- Latitud. La clase controla que sea un valor entre -90 y 90.
- Longitud. La clase controla que sea un valor entre -90 y 90.

También posee el método `toString` que devuelve una representación de la coordenada en forma de cadena.

### Clase Statistics

La clase `Statistics` implementa la interfaz `Stringable` y se utiliza para almacenar los datos de las estadísitcas de entrenamiento usadas por el resto de clases y cuenta con los siguientes atributos:

- Kilómetros de la semana. La clase controla que sea un valor positivo y que no sean mayores a los kilómetros del mes.
- Desnivel total de la semana. La clase controla que sea un valor positivo y que no sea mayor al desnivel total del mes.
- Kilómetros del mes. La clase controla que sea un valor positivo y que no sean mayores a los kilómetros del año ni menores a los kilómetros de la semana.
- Desnivel total del mes. La clase controla que sea un valor positivo y que no sea mayor al desnivel total del año ni menor al desnivel total de la semana.
- Kilómetros del año. La clase controla que sea un valor positivo y que no sean menores a los kilómetros del mes.
- Desnivel total del año. La clase controla que sea un valor positivo y que no sea menor al desnivel total del mes.
- Longitud. La clase controla que sea un valor entre -90 y 90.

También posee el método `toString` que devuelve una representación de las estadísticas en forma de cadena.

## Interfaces

### Interfaz Stringable

La interfaz `Stringable` obliga a los objetos que la implementen a poseer un método que devuelve su valor en forma de cadena con el método `toString`.

### Interfaz Genérica Collectable

La interfaz genérica `Collectable` obliga a los objetos que la implementen a poseer métodos para manejar una colección de datos de tipo T con un ID de tipo U:

- `add`: Añade un elemento a la colección.
- `update`: Actualiza un elemento de la colección.
- `remove`: Elimina un elemento de la colección según un ID.
- `get`: Devuelve el elemento de la colección en el índice indicado o `undefined`.
- `length`: Devuelve el número de elementos de la colección.

## Colecciones de objetos

Para el almacenamiento y gestión de los datos del sistema, se han creado colecciones especializadas.

### Clase Genérica Collection

La clase genérica `Collection` implementa las interfaces `Collectable` e `Stringable` y almacena una colección de datos de tipo T que deben poseer diferentes IDs de tipo U e implementar la interfaz `Stringable`. Los métodos que posee son:

- `add`: Añade un elemento a la colección tras comprobar que no ningún elemento almacenado tenga el mismo ID.
- `update`: Actualiza el elemento de la colección con el mismo ID que el introducido como parámetro si existe.
- `remove`: Elimina un elemento de la colección según su ID si existe.
- `get`: Devuelve el elemento de la colección en el índice indicado o `undefined` si el índice es inválido.
- `length`: Devuelve el número de elementos de la colección.
- `hasID`: Comprueba si existe algún elemento en la colección con el ID introducido.
- `toString`: Devuelve una representación de todos los elementos de la colección en forma de cadena.

### Clase RouteCollection

La clase `RouteCollection` hereda de la clase `Collection`, concretándola para almacenar rutas con un número como ID. Posee los siguientes métodos para la ordenación de la colección:

- `sortAlphabetically`: Ordena la colección por el nombre de las rutas alfabéticamente en orden ascendente.
- `sortReversedAlphabetically`: Ordena la colección por el nombre de las rutas alfabéticamente en orden descendente.
- `sortByNumberUsers`: Ordena la colección por el número de visitantes en orden ascendente.
- `sortReversedByNumberUsers`: Ordena la colección por el número de visitantes en orden descendente.
- `sortByLenght`: Ordena la colección por la longitud de las rutas en orden ascendente.
- `sortReversedByLenght`: Ordena la colección por la longitud de las rutas en orden descendente.
- `sortByScore`: Ordena la colección por la valoración media de las rutas en orden ascendente.
- `sortReversedByScore`: Ordena la colección por la valoración media de las rutas en orden descendente.
- `sortByActivity`: Ordena la colección por el tipo de actividad para el que están destinadas.

### Clase UserCollection

La clase `UserCollection` hereda de la clase `Collection`, concretándola para almacenar usuarios con un su nombre de usuario como ID. Posee los siguientes métodos para la ordenación de la colección:

- `sortByName`: Ordena la colección por el nombre de los usuarios alfabéticamente en orden ascendente.
- `sortReversedByName`: Ordena la colección por el nombre de los usuarios alfabéticamente en orden descendente.
- `sortByWeekKilometers`: Ordena la colección por la cantidad de kilómetros recorridos en la semana por los usuarios en orden ascendente.
- `sortReversedWeekKilometers`: Ordena la colección por la cantidad de kilómetros recorridos en la semana por los usuarios en orden descendente.
- `sortByMonthKilometers`: Ordena la colección por la cantidad de kilómetros recorridos en el mes por los usuarios en orden ascendente.
- `sortReversedMonthKilometers`: Ordena la colección por la cantidad de kilómetros recorridos en el mes por los usuarios en orden descendente.
- `sortByYearKilometers`: Ordena la colección por la cantidad de kilómetros recorridos en el año por los usuarios en orden ascendente.
- `sortReversedYearKilometers`: Ordena la colección por la cantidad de kilómetros recorridos en el año por los usuarios en orden descendente.

### Clase GroupCollection

La clase `GroupCollection` hereda de la clase `Collection`, concretándola para almacenar grupos con un número como ID. Posee los siguientes métodos para la ordenación de la colección:

- `sortByName`: Ordena la colección por el nombre de los grupos alfabéticamente en orden ascendente.
- `sortReversedByName`: Ordena la colección por el nombre de los grupos alfabéticamente en orden descendente.
- `sortByTotalWeekKilometers`: Ordena la colección por la cantidad de kilómetros recorridos en la semana en total por los grupos en orden ascendente.
- `sortReversedTotalWeekKilometers`: Ordena la colección por la cantidad de kilómetros recorridos en la semana en total por los grupos en orden descendente.
- `sortByTotalMonthKilometers`: Ordena la colección por la cantidad de kilómetros recorridos en el mes en total por los grupos en orden ascendente.
- `sortReversedTotalMonthKilometers`: Ordena la colección por la cantidad de kilómetros recorridos en el mes en total por los grupos en orden descendente.
- `sortByTotalYearKilometers`: Ordena la colección por la cantidad de kilómetros recorridos en el año en total por los grupos en orden ascendente.
- `sortReversedTotalYearKilometers`: Ordena la colección por la cantidad de kilómetros recorridos en el año en total por los grupos en orden descendente.
- `sortByNumberOfMembers`: Ordena la colección por el número de miembros de los grupos en orden ascendente.
- `sortReversedByNumberOfMembers`: Ordena la colección por el número de miembros de los grupos en orden descendente.

### Clase ChallengeCollection

La clase `ChallengeCollection` hereda de la clase `Collection`, concretándola para almacenar retos con un número como ID. Posee los siguientes métodos para la ordenación de la colección:

- `sortByName`: Ordena la colección por el nombre de los retos alfabéticamente en orden ascendente.
- `sortReversedByName`: Ordena la colección por el nombre de los retos alfabéticamente en orden descendente.
- `sortByKilometers`: Ordena la colección por la cantidad de kilómetros de los retos en orden ascendente.
- `sortReversedByKilometers`: Ordena la colección por la cantidad de kilómetros de los retos en orden descendente.
- `sortByTotalUsers`: Ordena la colección por el total de usuarios realizando los retos en orden ascendente.
- `sortReversedByTotalUsers`: Ordena la colección por el total de usuarios realizando retos en orden descendente.

## Bibliografía

- [Desarrollo de Sistemas Informáticos - Práctica 7 - DeStravaTe](https://ull-esit-inf-dsi-2223.github.io/prct07-destravate-dataModel/)
- [Desarrollo de Sistemas Informáticos - Aprendiendo TypeScript](https://ull-esit-inf-dsi-2223.github.io/typescript-theory/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [SonarCloud](https://www.sonarsource.com/products/sonarcloud/)
- Freeman, A. (2019). _Essential TypeScript: From Beginner to Pro_. Apress.
