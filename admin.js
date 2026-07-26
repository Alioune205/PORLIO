// admin.js - Tableau de bord PORLIO avec CRUD complet
const API_URL = 'http://127.0.0.1:8001/api';

// ================= NAVIGATION ================= //
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        const targetId = item.getAttribute('data-target');
        document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');
        document.getElementById('page-title').innerText = item.innerText.trim();

        if (targetId === 'profile') loadProfile();
        if (targetId === 'skills') loadSkills();
        if (targetId === 'projects') loadProjects();
        if (targetId === 'messages') loadMessages();
        if (targetId === 'posters') loadPosters();
    });
});

// Charger les stats au démarrage
async function loadStats() {
    try {
        const [resP, resM] = await Promise.all([
            fetch(`${API_URL}/projects/`),
            fetch(`${API_URL}/messages/`)
        ]);
        const [projects, messages] = await Promise.all([resP.json(), resM.json()]);
        document.getElementById('stat-projects').innerText = projects.length;
        document.getElementById('stat-messages').innerText = messages.length;
    } catch (e) { console.error(e); }
}
loadStats();

// ================= MODALS ================= //
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

// ============================================================
// PROJETS — CRUD complet
// ============================================================
let currentProjectId = null;

async function loadProjects() {
    try {
        const res = await fetch(`${API_URL}/projects/`);
        const projects = await res.json();
        const tbody = document.querySelector('#projects-table tbody');
        tbody.innerHTML = '';

        if (projects.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--text-muted); padding: 40px;">Aucun projet. Cliquez sur "+ Nouveau Projet" pour en ajouter un.</td></tr>';
            return;
        }

        projects.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${p.image_url}" alt="${p.title}" onerror="this.style.display='none'"></td>
                <td>
                    <strong>${p.title}</strong>
                    ${p.client_project ? '<span class="badge" style="background:rgba(224,181,51,0.2);color:#e0b533;margin-left:8px;">Client</span>' : ''}
                    <p style="color:var(--text-muted);font-size:0.82rem;margin-top:4px;line-height:1.4;">${p.description.substring(0, 80)}…</p>
                </td>
                <td>${p.tags.split(',').map(t => `<span class="badge">${t.trim()}</span>`).join(' ')}</td>
                <td style="white-space:nowrap;">
                    <button class="btn-primary" style="padding:6px 12px;font-size:0.8rem;margin-right:6px;" onclick="editProject(${p.id})">✏️ Modifier</button>
                    <button class="btn-danger" onclick="deleteProject(${p.id})">🗑 Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (e) { console.error("Erreur projets:", e); }
}

function openNewProjectModal() {
    currentProjectId = null;
    document.querySelector('#projectModal .modal-header h2').innerText = 'Ajouter un projet';
    document.getElementById('project-form').reset();
    document.getElementById('proj-client').checked = false;
    openModal('projectModal');
}

async function editProject(id) {
    try {
        const res = await fetch(`${API_URL}/projects/${id}/`);
        const p = await res.json();
        currentProjectId = id;
        document.querySelector('#projectModal .modal-header h2').innerText = 'Modifier le projet';
        document.getElementById('proj-title').value = p.title;
        document.getElementById('proj-desc').value = p.description;
        document.getElementById('proj-img').value = p.image_url;
        document.getElementById('proj-tags').value = p.tags;
        document.getElementById('proj-order').value = p.order;
        document.getElementById('proj-client').checked = p.client_project;
        openModal('projectModal');
    } catch (e) { alert('Impossible de charger ce projet.'); }
}

document.getElementById('project-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        title: document.getElementById('proj-title').value,
        description: document.getElementById('proj-desc').value,
        image_url: document.getElementById('proj-img').value,
        tags: document.getElementById('proj-tags').value,
        order: parseInt(document.getElementById('proj-order').value) || 0,
        client_project: document.getElementById('proj-client').checked,
    };
    const btn = e.target.querySelector('[type="submit"]');
    btn.textContent = 'Sauvegarde...';
    btn.disabled = true;
    try {
        const method = currentProjectId ? 'PUT' : 'POST';
        const url = currentProjectId ? `${API_URL}/projects/${currentProjectId}/` : `${API_URL}/projects/`;
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        closeModal('projectModal');
        loadProjects();
        loadStats();
    } catch (err) {
        alert("Erreur lors de la sauvegarde !");
    } finally {
        btn.textContent = 'Enregistrer';
        btn.disabled = false;
    }
});

async function deleteProject(id) {
    if (!confirm("Supprimer ce projet définitivement ?")) return;
    await fetch(`${API_URL}/projects/${id}/`, { method: 'DELETE' });
    loadProjects();
    loadStats();
}

// ============================================================
// PROFIL — Lecture & Modification
// ============================================================
let currentProfileId = null;

async function loadProfile() {
    try {
        const res = await fetch(`${API_URL}/profile/`);
        const profiles = await res.json();
        if (profiles.length > 0) {
            const p = profiles[0];
            currentProfileId = p.id;
            document.getElementById('prof-hero-title').value = p.hero_title || '';
            document.getElementById('prof-hero-name').value = p.hero_name || '';
            document.getElementById('prof-hero-sub').value = p.hero_subtitle || '';
            document.getElementById('prof-hero-desc').value = p.hero_description || '';
            document.getElementById('prof-about').value = p.about_text || '';
            document.getElementById('prof-cv-url').value = p.cv_url || '';
        }
    } catch (e) { console.error(e); }
}

async function saveProfile() {
    const data = {
        hero_title: document.getElementById('prof-hero-title').value,
        hero_name: document.getElementById('prof-hero-name').value,
        hero_subtitle: document.getElementById('prof-hero-sub').value,
        hero_description: document.getElementById('prof-hero-desc').value,
        about_text: document.getElementById('prof-about').value,
        cv_url: document.getElementById('prof-cv-url').value
    };
    try {
        const method = currentProfileId ? 'PUT' : 'POST';
        const url = currentProfileId ? `${API_URL}/profile/${currentProfileId}/` : `${API_URL}/profile/`;
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        showToast('✅ Profil sauvegardé !');
    } catch (e) {
        showToast('❌ Erreur lors de la sauvegarde.', true);
    }
}

// ============================================================
// COMPÉTENCES — CRUD complet
// ============================================================
async function loadSkills() {
    try {
        const res = await fetch(`${API_URL}/skills/`);
        const categories = await res.json();
        const container = document.getElementById('skills-container');
        container.innerHTML = '';

        if (categories.length === 0) {
            container.innerHTML = '<p style="color:var(--text-muted)">Aucune catégorie. Créez-en une avec le bouton ci-dessus.</p>';
            return;
        }

        categories.forEach(cat => {
            const html = `
                <div class="skill-category-card">
                    <div class="skill-category-header">
                        <h3>${cat.name}</h3>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <button class="btn-primary" style="padding:4px 10px;font-size:0.8rem;" onclick="openSkillModal(${cat.id})">+ Compétence</button>
                            <button class="btn-danger" onclick="deleteSkillCat(${cat.id})">🗑</button>
                        </div>
                    </div>
                    <div class="skill-pills">
                        ${cat.skills.length === 0 ? '<span style="color:var(--text-muted);font-size:0.85rem;">Aucune compétence pour l\'instant</span>' : ''}
                        ${cat.skills.map(s => `
                            <div class="skill-pill">
                                ${s.name}
                                <button onclick="deleteSkill(${s.id})" title="Supprimer">×</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });
    } catch (e) { console.error(e); }
}

document.getElementById('skillcat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        await fetch(`${API_URL}/skills/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: document.getElementById('scat-name').value, order: 0 })
        });
        closeModal('skillCatModal');
        e.target.reset();
        loadSkills();
    } catch (e) {}
});

function openSkillModal(catId) {
    document.getElementById('skill-cat-id').value = catId;
    openModal('skillModal');
}

document.getElementById('skill-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        await fetch(`${API_URL}/skill/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: document.getElementById('skill-name').value, category: document.getElementById('skill-cat-id').value, order: 0 })
        });
        closeModal('skillModal');
        e.target.reset();
        loadSkills();
    } catch (e) {}
});

async function deleteSkillCat(id) {
    if (!confirm("Supprimer la catégorie et TOUTES ses compétences ?")) return;
    await fetch(`${API_URL}/skills/${id}/`, { method: 'DELETE' });
    loadSkills();
}

async function deleteSkill(id) {
    if (!confirm("Supprimer cette compétence ?")) return;
    await fetch(`${API_URL}/skill/${id}/`, { method: 'DELETE' });
    loadSkills();
}

// ============================================================
// MESSAGES — Lecture & Suppression
// ============================================================
async function loadMessages() {
    try {
        const res = await fetch(`${API_URL}/messages/`);
        const messages = await res.json();
        const container = document.getElementById('messages-list');
        container.innerHTML = '';

        if (messages.length === 0) {
            container.innerHTML = '<div style="color:var(--text-muted);text-align:center;padding:40px;">Aucun message reçu pour l\'instant.</div>';
            return;
        }

        messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        messages.forEach(m => {
            const date = new Date(m.created_at).toLocaleDateString('fr-FR', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
            const phoneHtml = m.phone ? `<a href="tel:${m.phone}" style="color:var(--accent);">📞 ${m.phone}</a>` : '';
            container.innerHTML += `
                <div class="message-card" style="position:relative;">
                    <div class="message-header">
                        <span>De : <strong>${m.name}</strong> — <a href="mailto:${m.email}" style="color:var(--primary);">${m.email}</a>${m.phone ? ' · ' + phoneHtml : ''}</span>
                        <span>${date}</span>
                    </div>
                    <p style="line-height:1.7;">${m.content}</p>
                    <button class="btn-danger" style="position:absolute;top:16px;right:16px;font-size:0.75rem;" onclick="deleteMessage(${m.id})">🗑 Supprimer</button>
                </div>
            `;
        });
        loadStats();
    } catch (e) { console.error(e); }
}

async function deleteMessage(id) {
    if (!confirm("Supprimer ce message définitivement ?")) return;
    await fetch(`${API_URL}/messages/${id}/`, { method: 'DELETE' });
    loadMessages();
}

// ============================================================
// POSTERS — CRUD complet
// ============================================================
let currentPosterId = null;

async function loadPosters() {
    try {
        const res = await fetch(`${API_URL}/posters/`);
        const posters = await res.json();
        const container = document.getElementById('posters-grid');
        container.innerHTML = '';
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
        container.style.gap = '20px';

        if (posters.length === 0) {
            container.innerHTML = '<p style="color:var(--text-muted)">Aucun poster. Ajoutez-en un avec le bouton ci-dessus.</p>';
            return;
        }

        posters.forEach(p => {
            container.innerHTML += `
                <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:12px;text-align:center;">
                    <img src="${p.image_url}" alt="${p.title}" style="width:100%;height:150px;object-fit:cover;border-radius:4px;margin-bottom:12px;" onerror="this.style.background='rgba(255,255,255,0.05)'">
                    <h4 style="margin-bottom:12px;font-size:0.9rem;">${p.title}</h4>
                    <div style="display:flex;gap:8px;justify-content:center;">
                        <button class="btn-primary" style="padding:5px 10px;font-size:0.78rem;" onclick="editPoster(${p.id},'${p.title}','${p.image_url}')">✏️</button>
                        <button class="btn-danger" onclick="deletePoster(${p.id})">🗑</button>
                    </div>
                </div>
            `;
        });
    } catch (e) {}
}

function openNewPosterModal() {
    currentPosterId = null;
    document.querySelector('#posterModal .modal-header h2').innerText = 'Ajouter un Poster';
    document.getElementById('poster-form').reset();
    openModal('posterModal');
}

function editPoster(id, title, imageUrl) {
    currentPosterId = id;
    document.querySelector('#posterModal .modal-header h2').innerText = 'Modifier le Poster';
    document.getElementById('poster-title').value = title;
    document.getElementById('poster-img').value = imageUrl;
    openModal('posterModal');
}

document.getElementById('poster-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = { title: document.getElementById('poster-title').value, image_url: document.getElementById('poster-img').value, order: 0 };
    try {
        const method = currentPosterId ? 'PUT' : 'POST';
        const url = currentPosterId ? `${API_URL}/posters/${currentPosterId}/` : `${API_URL}/posters/`;
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        closeModal('posterModal');
        e.target.reset();
        loadPosters();
    } catch (e) {}
});

async function deletePoster(id) {
    if (!confirm("Supprimer ce poster ?")) return;
    await fetch(`${API_URL}/posters/${id}/`, { method: 'DELETE' });
    loadPosters();
}

// ============================================================
// Toast Notification
// ============================================================
function showToast(msg, isError = false) {
    let toast = document.getElementById('admin-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'admin-toast';
        toast.style.cssText = 'position:fixed;bottom:30px;right:30px;background:var(--bg-card);border:1px solid var(--border);color:var(--text-main);padding:14px 24px;border-radius:8px;font-size:0.9rem;z-index:9999;transition:opacity 0.4s;box-shadow:0 8px 32px rgba(0,0,0,0.4);';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.borderColor = isError ? '#ff6b6b' : 'var(--primary)';
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}
