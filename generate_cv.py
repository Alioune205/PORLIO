import base64

with open('assets/PAS.jpg','rb') as f:
    b64 = base64.b64encode(f.read()).decode()

cv_html = """<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CV — Pape Alioune Sene</title>
<style>
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap");
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:"Inter",Arial,sans-serif;background:#f0f4f8;color:#1e293b;font-size:10pt;}
  .page{width:210mm;min-height:297mm;margin:0 auto;background:#fff;display:flex;box-shadow:0 0 40px rgba(0,0,0,.15);}
  .sidebar{width:68mm;background:linear-gradient(160deg,#0f172a 0%,#144ec4 100%);padding:28px 20px;color:#fff;flex-shrink:0;}
  .main{flex:1;padding:32px 28px;}
  .photo-wrap{text-align:center;margin-bottom:22px;}
  .photo-wrap img{width:100px;height:100px;border-radius:50%;border:3px solid rgba(255,255,255,.4);object-fit:cover;}
  .sidebar h1{font-size:14pt;font-weight:800;text-align:center;line-height:1.2;margin-bottom:4px;}
  .sidebar .job-title{font-size:8.5pt;text-align:center;color:rgba(255,255,255,.7);margin-bottom:22px;font-weight:400;}
  .s-section{margin-bottom:20px;}
  .s-title{font-size:8pt;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#e0b533;border-bottom:1px solid rgba(255,255,255,.2);padding-bottom:5px;margin-bottom:10px;}
  .contact-item{display:flex;align-items:center;gap:7px;margin-bottom:7px;font-size:8pt;color:rgba(255,255,255,.85);}
  .skill-bar-wrap{margin-bottom:8px;}
  .skill-bar-wrap .skill-name{font-size:8pt;color:rgba(255,255,255,.9);margin-bottom:3px;}
  .skill-bar{height:4px;background:rgba(255,255,255,.2);border-radius:2px;}
  .skill-bar-fill{height:4px;border-radius:2px;background:linear-gradient(90deg,#e0b533,#f59e0b);}
  .tag-wrap{display:flex;flex-wrap:wrap;gap:5px;}
  .tag{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);border-radius:4px;padding:3px 8px;font-size:7.5pt;color:rgba(255,255,255,.85);}
  .main-section{margin-bottom:22px;}
  .m-title{font-size:11pt;font-weight:800;color:#0f172a;border-left:3px solid #144ec4;padding-left:10px;margin-bottom:12px;text-transform:uppercase;letter-spacing:.5px;}
  .exp-item{margin-bottom:14px;}
  .exp-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:3px;}
  .exp-title{font-weight:700;font-size:9.5pt;color:#0f172a;}
  .exp-date{font-size:8pt;color:#64748b;white-space:nowrap;background:#f1f5f9;padding:2px 8px;border-radius:10px;}
  .exp-sub{font-size:8.5pt;color:#144ec4;font-weight:500;margin-bottom:4px;}
  .exp-desc{font-size:8.5pt;color:#475569;line-height:1.55;}
  .exp-tags{margin-top:5px;display:flex;flex-wrap:wrap;gap:4px;}
  .exp-tag{background:#eff6ff;color:#144ec4;border-radius:4px;padding:2px 7px;font-size:7.5pt;font-weight:500;}
  .edu-item{display:flex;gap:12px;margin-bottom:12px;align-items:flex-start;}
  .edu-icon{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#144ec4,#e0b533);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14pt;}
  .edu-text .edu-degree{font-weight:700;font-size:9.5pt;color:#0f172a;}
  .edu-text .edu-school{font-size:8.5pt;color:#144ec4;margin-bottom:2px;}
  .edu-text .edu-year{font-size:8pt;color:#64748b;}
  .divider{height:1px;background:#e2e8f0;margin:8px 0 14px;}
  @media print{body{background:#fff;}.page{box-shadow:none;width:100%;min-height:100%;}}
</style>
</head>
<body>
<div class="page">
  <div class="sidebar">
    <div class="photo-wrap">
      <img src="data:image/jpeg;base64,PHOTO_B64" alt="Pape Alioune Sene">
    </div>
    <h1>Pape Alioune<br>Sene</h1>
    <p class="job-title">Developpeur Full-Stack &amp; UX/UI Designer<br>PAS Digital Studio</p>

    <div class="s-section">
      <div class="s-title">Contact</div>
      <div class="contact-item"><span>&#128241;</span><span>+221 XX XXX XX XX</span></div>
      <div class="contact-item"><span>&#128231;</span><span>senepapealioune0@gmail.com</span></div>
      <div class="contact-item"><span>&#127758;</span><span>Dakar, Senegal</span></div>
      <div class="contact-item"><span>&#128279;</span><span>github.com/Alioune205</span></div>
      <div class="contact-item"><span>&#128279;</span><span>linkedin.com/in/papealiounesene</span></div>
    </div>

    <div class="s-section">
      <div class="s-title">Competences Cles</div>
      <div class="skill-bar-wrap"><div class="skill-name">Django REST Framework</div><div class="skill-bar"><div class="skill-bar-fill" style="width:90%"></div></div></div>
      <div class="skill-bar-wrap"><div class="skill-name">React / JavaScript</div><div class="skill-bar"><div class="skill-bar-fill" style="width:85%"></div></div></div>
      <div class="skill-bar-wrap"><div class="skill-name">Flutter</div><div class="skill-bar"><div class="skill-bar-fill" style="width:80%"></div></div></div>
      <div class="skill-bar-wrap"><div class="skill-name">PostgreSQL</div><div class="skill-bar"><div class="skill-bar-fill" style="width:80%"></div></div></div>
      <div class="skill-bar-wrap"><div class="skill-name">Figma / UI-UX</div><div class="skill-bar"><div class="skill-bar-fill" style="width:85%"></div></div></div>
      <div class="skill-bar-wrap"><div class="skill-name">Photoshop / Video</div><div class="skill-bar"><div class="skill-bar-fill" style="width:75%"></div></div></div>
    </div>

    <div class="s-section">
      <div class="s-title">Technologies</div>
      <div class="tag-wrap">
        <span class="tag">Python</span><span class="tag">Angular</span><span class="tag">Odoo</span>
        <span class="tag">Groq IA</span><span class="tag">Power BI</span><span class="tag">Git/GitHub</span>
        <span class="tag">n8n</span><span class="tag">WordPress</span><span class="tag">ML</span>
      </div>
    </div>

    <div class="s-section">
      <div class="s-title">Langues</div>
      <div class="contact-item"><span>FR</span><span>Francais — Courant</span></div>
      <div class="contact-item"><span>EN</span><span>Anglais — Intermediaire</span></div>
      <div class="contact-item"><span>WO</span><span>Wolof — Natif</span></div>
    </div>

    <div class="s-section">
      <div class="s-title">Interets</div>
      <div class="contact-item"><span>*</span><span>Civic-Tech &amp; Impact Social</span></div>
      <div class="contact-item"><span>*</span><span>Intelligence Artificielle</span></div>
      <div class="contact-item"><span>*</span><span>Souverainete Tech Africaine</span></div>
      <div class="contact-item"><span>*</span><span>Design &amp; Creativite Visuelle</span></div>
      <div class="contact-item"><span>*</span><span>Football</span></div>
    </div>
  </div>

  <div class="main">
    <div class="main-section">
      <div class="m-title">Profil Professionnel</div>
      <p style="font-size:8.5pt;color:#475569;line-height:1.65;">
        Etudiant en BTS Informatique et fondateur de <strong>PAS Digital Studio</strong>, je suis passionne par le developpement d'applications web, mobiles et IA a fort impact. Je cree des solutions innovantes pour l'ecosysteme africain : registres civils intelligents, e-sante, civic-tech et souverainete numerique. Mon objectif : participer activement au developpement socio-economique du Senegal par la technologie.
      </p>
    </div>

    <div class="main-section">
      <div class="m-title">Projets Realises</div>

      <div class="exp-item">
        <div class="exp-header">
          <span class="exp-title">CFP Abene — Site Institutionnel</span>
          <span class="exp-date">2024 — Client reel</span>
        </div>
        <div class="exp-sub">Centre de Formation Professionnelle d'Abene</div>
        <div class="exp-desc">Conception et developpement du site web officiel : 10 filieres de formation, actualites, formulaire d'inscription en ligne, partenaires internationaux et integration cartographique.</div>
        <div class="exp-tags"><span class="exp-tag">WordPress</span><span class="exp-tag">Elementor</span><span class="exp-tag">SEO</span></div>
      </div>
      <div class="divider"></div>

      <div class="exp-item">
        <div class="exp-header">
          <span class="exp-title">Teranga Civil / SUNU CIVIL</span>
          <span class="exp-date">2024 — GovTech</span>
        </div>
        <div class="exp-sub">Registre civil numerique pour communes senegalaises</div>
        <div class="exp-desc">Plateforme GovTech centralisant les donnees d'etat civil : gestion des roles, securite avancee, architecture full-stack scalable et tableau de bord analytique.</div>
        <div class="exp-tags"><span class="exp-tag">Django</span><span class="exp-tag">React</span><span class="exp-tag">PostgreSQL</span></div>
      </div>
      <div class="divider"></div>

      <div class="exp-item">
        <div class="exp-header">
          <span class="exp-title">DiabetoConseil</span>
          <span class="exp-date">2024 — Mobile Health</span>
        </div>
        <div class="exp-sub">Application mobile de conseil sante sur le diabete</div>
        <div class="exp-desc">Application mobile integrant un assistant IA (Groq / Llama 3.3) pour le suivi glycemique, les conseils personnalises et la prise de rendez-vous medical.</div>
        <div class="exp-tags"><span class="exp-tag">Flutter</span><span class="exp-tag">Groq IA</span><span class="exp-tag">Django</span></div>
      </div>
      <div class="divider"></div>

      <div class="exp-item">
        <div class="exp-header">
          <span class="exp-title">WaxalePay</span>
          <span class="exp-date">2024 — Civic Tech</span>
        </div>
        <div class="exp-sub">Portail citoyen de suivi des transferts sociaux</div>
        <div class="exp-desc">Portail permettant aux citoyens de verifier leur eligibilite aux programmes sociaux de l'Etat (PNBSF, CMU) avec un chatbot IA d'accompagnement.</div>
        <div class="exp-tags"><span class="exp-tag">UI/UX</span><span class="exp-tag">Chatbot IA</span><span class="exp-tag">Figma</span></div>
      </div>
    </div>

    <div class="main-section">
      <div class="m-title">Formation</div>
      <div class="edu-item">
        <div class="edu-icon">&#127891;</div>
        <div class="edu-text">
          <div class="edu-degree">BTS Informatique — Developpement d'Applications</div>
          <div class="edu-school">Etablissement Superieur, Dakar — Senegal</div>
          <div class="edu-year">2023 — En cours</div>
        </div>
      </div>
      <div class="edu-item">
        <div class="edu-icon">&#127891;</div>
        <div class="edu-text">
          <div class="edu-degree">Baccalaureat — Serie Scientifique</div>
          <div class="edu-school">Lycee, Senegal</div>
          <div class="edu-year">2023 — Obtenu</div>
        </div>
      </div>
    </div>

    <div class="main-section" style="background:#f8fafc;padding:14px;border-radius:8px;">
      <div class="m-title">Valeurs &amp; Vision</div>
      <p style="font-size:8.5pt;color:#475569;line-height:1.65;">
        Convaincu que la technologie est un levier de developpement pour l'Afrique, je m'engage dans des projets a impact social et civique. Je crois en la collaboration, l'innovation ouverte et la formation des prochaines generations de developpeurs senegalais.
      </p>
    </div>
  </div>
</div>
</body>
</html>"""

cv_html = cv_html.replace("PHOTO_B64", b64)

with open('CV_Pape_Alioune_Sene.html', 'w', encoding='utf-8') as f:
    f.write(cv_html)

print("CV cree avec succes: CV_Pape_Alioune_Sene.html")
