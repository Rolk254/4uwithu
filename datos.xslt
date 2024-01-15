<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <!-- Plantilla principal -->
  <xsl:template match="/">
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="styles.css"/> <!-- Agrega tu archivo de estilos CSS -->
      </head>
      <body>
        <xsl:apply-templates select="//equipo"/>
      </body>
    </html>
  </xsl:template>

  <!-- Plantilla para cada equipo -->
  <xsl:template match="equipo">
    <details class="{@clase}">
      <summary class="toggle-summary">
        <xsl:value-of select="nombre"/>
        <span class="toggle-button">▶</span>
      </summary>
      <h1><u>Entrenador</u></h1>
      <div class="divjugadores">
        <div class="equipo-container">
          <img class="fotoequipos" src="{entrenador/imagen}" alt="{entrenador/nombre}"/>
          <div class="divjugadores">
            <p><xsl:value-of select="entrenador/nombre"/></p>
          </div>
        </div>
      </div>
      <hr/>
      <h1>Jugadores:</h1>
      <xsl:for-each select="jugadores/jugador">
        <xsl:variable name="posicion" select="@posicion"/>
        <h1><u><xsl:value-of select="$posicion"/></u></h1>
        <div class="divjugadores">
          <xsl:for-each select=".">
            <div class="equipo-container">
              <img class="fotoequipos" src="{imagen}" alt="{nombre}"/>
              <div class="divjugadores">
                <p><xsl:value-of select="nombre"/></p>
              </div>
            </div>
          </xsl:for-each>
        </div>
      </xsl:for-each>
    </details>
  </xsl:template>

</xsl:stylesheet>
