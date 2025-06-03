let editMode = false;
let unsavedChanges = false;

function toggleEditMode() {
    editMode = !editMode;
    const editables = document.querySelectorAll('[contenteditable]');
    const contentAreas = document.querySelectorAll('.content-area');
    
    editables.forEach(el => {
        el.contentEditable = editMode;
    });
    
    contentAreas.forEach(area => {
        if (editMode) {
            area.classList.add('editable');
            area.contentEditable = true;
        } else {
            area.classList.remove('editable');
            area.contentEditable = false;
        }
    });
    
    document.querySelector('.admin-controls .admin-btn').textContent = editMode ? '👁️ Visualizar' : '✏️ Editar';
}

function saveChanges() {
    if (unsavedChanges || editMode) {
        // Simula salvamento
        const now = new Date();
        document.getElementById('lastUpdate').textContent = `Última atualização: ${now.toLocaleString('pt-BR')}`;
        document.getElementById('syncTime').textContent = now.toLocaleString('pt-BR');
        
        // Feedback visual
        document.body.classList.add('highlight');
        setTimeout(() => document.body.classList.remove('highlight'), 2000);
        
        alert('✅ Alterações salvas com sucesso!');
        unsavedChanges = false;
    } else {
        alert('ℹ️ Nenhuma alteração para salvar.');
    }
}

function publishChanges() {
    if (confirm('🚀 Publicar alterações para todos os usuários?')) {
        alert('✅ Alterações publicadas com sucesso!');
    }
}

function viewHistory() {
    alert('📈 Histórico de alterações:\n\n• 03/06 14:30 - Atualização de conteúdo\n• 02/06 16:45 - Nova seção adicionada\n• 01/06 09:15 - Correções gerais');
}

function addNewSection() {
    document.getElementById('sectionModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('sectionModal').style.display = 'none';
}

function editSection(btn) {
    const section = btn.closest('.section-card');
    const contentArea = section.querySelector('.content-area');
    contentArea.classList.add('editable');
    contentArea.contentEditable = true;
    contentArea.focus();
}

function deleteSection(btn) {
    if (confirm('🗑️ Tem certeza que deseja excluir esta seção?')) {
        btn.closest('.section-card').remove();
        unsavedChanges = true;
    }
}

function closeBanner() {
    document.getElementById('newsBanner').style.display = 'none';
}

function quickAction(action) {
    const actions = {
        emergency: 'Abrindo procedimentos de emergência...',
        training: 'Redirecionando para treinamentos...',
        reports: 'Carregando dashboard de relatórios...',
        calendar: 'Abrindo agenda corporativa...'
    };
    alert(actions[action]);
}

// Form submission
document.getElementById('sectionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const icon = document.getElementById('sectionIcon').value;
    const title = document.getElementById('sectionTitle').value;
    const content = document.getElementById('sectionContent').value;
    
    if (title && content) {
        const newSection = createSectionHTML(icon, title, content);
        document.getElementById('sectionsGrid').appendChild(newSection);
        
        closeModal();
        this.reset();
        unsavedChanges = true;
        alert('✅ Nova seção criada com sucesso!');
    }
});

function createSectionHTML(icon, title, content) {
    const section = document.createElement('div');
    section.className = 'section-card';
    section.innerHTML = `
        <div class="section-header">
            <h3 class="section-title">${icon} ${title}</h3>
            <div class="section-actions">
                <button class="action-btn" onclick="editSection(this)">✏️</button>
                <button class="action-btn" onclick="deleteSection(this)">🗑️</button>
            </div>
        </div>
        <div class="content-area">
            <p>${content}</p>
        </div>
        <div class="update-info">
            <span>Por: Você</span>
            <span>Agora</span>
        </div>
    `;
    return section;
}

// Auto-save em intervalos
setInterval(() => {
    if (unsavedChanges && editMode) {
        console.log('Auto-salvando...');
        // Implementar auto-save aqui
    }
}, 30000);

// Detectar mudanças
document.addEventListener('input', () => {
    unsavedChanges = true;
});

// Fechar modal clicando fora
window.addEventListener('click', (e) => {
    const modal = document.getElementById('sectionModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Função para editar cabeçalho
function editHeader() {
    const title = document.getElementById('mainTitle');
    const subtitle = document.getElementById('subtitle');
    
    title.contentEditable = true;
    subtitle.contentEditable = true;
    
    title.focus();
    
    // Adiciona evento para salvar quando perder o foco
    title.addEventListener('blur', () => {
        title.contentEditable = false;
        subtitle.contentEditable = false;
        unsavedChanges = true;
    });
    
    subtitle.addEventListener('blur', () => {
        title.contentEditable = false;
        subtitle.contentEditable = false;
        unsavedChanges = true;
    });
}
