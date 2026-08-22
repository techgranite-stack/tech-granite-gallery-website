<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  exclude-result-prefixes="sitemap">
  
  <xsl:output method="html" encoding="UTF-8" indent="yes" />
  
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>Granite Gallery — XML Sitemap</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          :root {
            --ivory: #FFF8F0;
            --mahogany: #4B2E2B;
            --copper: #C08552;
            --bronze: #8C5A3C;
            --white: #ffffff;
            --text-muted: rgba(75, 46, 43, 0.6);
            --border-color: rgba(75, 46, 43, 0.08);
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: var(--mahogany);
            background-color: var(--ivory);
            margin: 0;
            padding: 40px 20px;
          }

          .container {
            max-width: 960px;
            margin: 0 auto;
            background: var(--white);
            padding: 40px;
            border-radius: 20px;
            border: 1px solid var(--border-color);
            box-shadow: 0 10px 40px rgba(75, 46, 43, 0.02);
          }

          header {
            margin-bottom: 32px;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 24px;
          }

          h1 {
            font-size: 24px;
            font-weight: 600;
            margin: 0 0 10px 0;
            color: var(--mahogany);
          }

          h1 em {
            font-style: normal;
            color: var(--copper);
          }

          .desc {
            font-size: 14px;
            line-height: 1.6;
            color: var(--text-muted);
            margin: 0;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          th {
            text-align: left;
            padding: 14px 16px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-weight: 600;
            color: var(--mahogany);
            border-bottom: 2px solid var(--border-color);
          }

          td {
            padding: 14px 16px;
            font-size: 14px;
            border-bottom: 1px solid var(--border-color);
            word-break: break-all;
          }

          tr:last-child td {
            border-bottom: none;
          }

          tr:hover td {
            background-color: rgba(192, 133, 82, 0.02);
          }

          a {
            color: var(--copper);
            text-decoration: none;
            font-weight: 500;
          }

          a:hover {
            color: var(--bronze);
            text-decoration: underline;
          }

          .badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 100px;
            background: rgba(192, 133, 82, 0.1);
            border: 1px solid rgba(192, 133, 82, 0.2);
            color: var(--bronze);
            font-size: 11px;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>Granite Gallery — <em>XML Sitemap Index</em></h1>
            <p class="desc">
              Generated dynamically to assist search engines like Google, Bing, and Yandex in indexing natural stone products, surface finishes, and architectural landmark projects.
            </p>
          </header>
          
          <!-- Determine if it is a Sitemap Index or a URL set -->
          <xsl:choose>
            <xsl:when test="sitemap:sitemapindex">
              <table>
                <thead>
                  <tr>
                    <th style="width: 50%;">Sitemap URL</th>
                    <th style="width: 25%; text-align: center;">URLs Count</th>
                    <th style="width: 25%;">Last Modified</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                    <tr>
                      <td>
                        <a href="{sitemap:loc}">
                          <xsl:value-of select="sitemap:loc" />
                        </a>
                      </td>
                      <td style="text-align: center;">
                        <span class="badge">
                          <xsl:value-of select="sitemap:count" />
                        </span>
                      </td>
                      <td>
                        <xsl:value-of select="sitemap:lastmod" />
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </xsl:when>
            
            <xsl:when test="sitemap:urlset">
              <table>
                <thead>
                  <tr>
                    <th style="width: 60%;">Location URL</th>
                    <th style="width: 15%; text-align: center;">Priority</th>
                    <th style="width: 15%; text-align: center;">Change Freq</th>
                    <th style="width: 10%;">Last Mod</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <tr>
                      <td>
                        <a href="{sitemap:loc}">
                          <xsl:value-of select="sitemap:loc" />
                        </a>
                      </td>
                      <td style="text-align: center;">
                        <xsl:value-of select="sitemap:priority" />
                      </td>
                      <td style="text-align: center; text-transform: capitalize;">
                        <xsl:value-of select="sitemap:changefreq" />
                      </td>
                      <td>
                        <xsl:value-of select="sitemap:lastmod" />
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </xsl:when>
          </xsl:choose>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
