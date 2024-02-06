<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="/">
    <html lang="es">
    <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>NSLA-Calendario</title>
        <link rel="stylesheet" href="../estilos/styles.css"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto"/>
        <link rel="icon" type="image/x-icon" href="../imagenes/logos/nofondo.png"/>
    </head>
    <body>
        <header>
            <div class="left-section">
              <a href="../index.html"><img class="logo" src="../imagenes/logos/nofondo2.png" alt=""/></a>
            </div>
            <div class="togglearea">
                <label for="toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>
              <input type="checkbox" id="toggle"/> 
              <div class="navbar">
                <a href="../index.html">Inicio</a>
                <a id="active" href="calendar_t3.xml">Calendario</a>
                <a href="../paginas/clasi.html">Clasificación</a>
                <a href="datos.xml">Equipos</a>
                <a href="../paginas/noticias.html">Noticias</a>
                <a href="../paginas/contacto.html">Contacto</a>
              </div>
        </header>
        <div class="select" >
            <select id="seleccionarPagina">
              <option value="">Selecciona una Temporada</option>
              <option value="calendar_t1.xml">TEMPORADA 1</option>
              <option value="calendar_t2.xml">TEMPORADA 2</option>
              <option value="calendar_t3.xml">TEMPORADA 3</option>
            </select>
        </div>
        <button onclick="irAPaginaSeleccionada()">Ir a la Temporada Seleccionada</button>
        <h1 class="titulin"><u>
          <xsl:value-of select="temporada/numtemp"/></u> 
          </h1>
          <nav class="sidebar" id="sidebar">
            <details>
              <summary>Jornadas</summary>
              <ul>
                <xsl:apply-templates select="//jornada" mode="menu"/>
              </ul>
            </details>
          </nav>
          <a class="boton" href="#active"><button class="pasubir">
            <svg class="svgIcon" viewBox="0 0 384 512">
              <path
                d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
              ></path>
            </svg>
          </button></a>
        <xsl:apply-templates select="//jornada"/>
        <footer class="footer">
          <div>
            <ul>
              <li><img class="logopie" src="../imagenes/logos/nofondo.png" alt=""/></li>
              <li>
                <p>
                  © 2023 NSLA Enterprises LLC. NSLA and the NSLA shield design are registered trademarks of the National Football League.
                  The team names, logos and uniform designs are registered trademarks of the teams indicated.
                  All other NSLA-related trademarks are trademarks of the National Football League. NSLA footage © NSLA Productions LLC.
                </p>
              </li>
              <li class="terms">
                <a href="../paginas/privacidad.html">Política de Privacidad</a>
                <a href="../paginas/terminos.html">Terminos de Servicio</a>
                <a href="">Términos y Condiciones de Subscripción</a>
                <a href="">Tus Ajustes de Privacidad</a>
                <a href="">Ajustes de Cookies</a>
              </li>
            </ul>
          </div>
        </footer>
        <script src="../scripts/temporadas.js"></script>
    </body>
    </html>
  </xsl:template>

  <xsl:template match="jornada" mode="menu">
    <li><a href="#jornada_{@num}">Jornada <xsl:value-of select="@num"/></a></li>
</xsl:template>

<xsl:template match="jornada">
    <h1 class="jornada" id="jornada_{@num}">Jornada <xsl:value-of select="@num"/></h1>
    <div class="divpartidos">
        <xsl:apply-templates select="partido"/>
    </div>
</xsl:template>

  <xsl:template match="partido">
    <div class="infopartido">
      <label class="space">
      <h2><xsl:value-of select="fecha"/></h2>
      <h3><xsl:value-of select="hora"/></h3>
      </label>
      <hr/>
      <label class="space">
        <h3>
          <xsl:value-of select="equipos/local"/>
        </h3>
        <h3>
          <xsl:value-of select="equipos/puntoslocal"/>
        </h3>
          -
        <h3>
          <xsl:value-of select="equipos/puntosvisitante"/>
        </h3>
        <h3>
          <xsl:value-of select="equipos/visitante"/>
        </h3>
      </label>
      <hr/>
    </div>
  </xsl:template>
</xsl:stylesheet>
