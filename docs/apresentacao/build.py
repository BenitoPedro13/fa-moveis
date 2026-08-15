import base64, pathlib
def b64(p): return base64.b64encode(pathlib.Path(p).read_bytes()).decode()
faces = f"""<style>
/* Her three faces, inlined as data URIs — the Artifact CSP blocks font CDNs, and a silent
   fallback would put the deck in a different typeface than the site it is presenting. */
@font-face{{font-family:"Bodoni Moda";src:url(data:font/woff2;base64,{b64('bodoni.woff2')}) format("woff2");font-weight:400 900;font-style:normal;font-display:swap;}}
@font-face{{font-family:"DM Sans";src:url(data:font/woff2;base64,{b64('dmsans.woff2')}) format("woff2");font-weight:100 1000;font-style:normal;font-display:swap;}}
@font-face{{font-family:"IBM Plex Mono";src:url(data:font/woff2;base64,{b64('mono400.woff2')}) format("woff2");font-weight:400;font-style:normal;font-display:swap;}}
@font-face{{font-family:"IBM Plex Mono";src:url(data:font/woff2;base64,{b64('mono500.woff2')}) format("woff2");font-weight:500;font-style:normal;font-display:swap;}}
</style>
"""
n, path = pathlib.Path("qr_path.txt").read_text().split("|",1); n=int(n)
qr=(f'<svg class="qr" viewBox="-2 -2 {n+4} {n+4}" role="img" '
    f'aria-label="Código QR para fa-moveis.vercel.app">'
    f'<rect x="-2" y="-2" width="{n+4}" height="{n+4}"/><path d="{path}"/></svg>')
html=pathlib.Path("deck_body.html").read_text()
i=html.index("</title>")+len("</title>")
html=html[:i]+"\n"+faces+html[i:]
html=html.replace("__QR__",qr)
pathlib.Path("deck.html").write_text(html)
for k in range(1,14):
    css=f"<style>.deck{{height:auto;overflow:visible}}.slide{{display:none!important}}.slide:nth-of-type({k}){{display:flex!important}}</style>"
    pathlib.Path(f"slide{k}.html").write_text(
      f"""<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><style>*{{margin:0;padding:0}}</style></head>
<body>{html}{css}</body></html>""")
print("rebuilt", len(html)//1024,"KB")
