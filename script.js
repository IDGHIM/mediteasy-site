// Hide navbar on scroll down
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const scrollThreshold = 5;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll <= 0) {
        navbar.classList.remove('hidden');
        return;
    }

    if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
        navbar.classList.add('hidden');
    }

    else if (currentScroll < lastScrollTop) {
        navbar.classList.remove('hidden');
    }

    lastScrollTop = currentScroll;
})


const contributions = {
            bug: { title: "Report bug", description: "Signalez les bugs que vous rencontrez" },
            doc: { title: "Documentation", description: "Améliorez la documentation" },
            feature: { title: "Fonctionnalité à ajouter", description: "Proposez de nouvelles fonctionnalités" }
        };

        let selectedType = null;
        let submissions = [];

        async function loadSubmissions() {
            try {
                const result = await window.storage.get('contributions', true);
                if (result) {
                    submissions = JSON.parse(result.value);
                }
            } catch (error) {
                console.log('Aucune contribution existante');
                submissions = [];
            } finally {
                document.getElementById('loading').style.display = 'none';
                document.getElementById('content').style.display = 'block';
                renderSubmissions();
            }
        }

        function renderSubmissions() {
            const section = document.getElementById('submissionsSection');
            const list = document.getElementById('submissionsList');
            const count = document.getElementById('submissionsCount');

            if (submissions.length > 0) {
                section.style.display = 'block';
                count.textContent = submissions.length;
                list.innerHTML = submissions.map(sub => `
                    <div class="submission-item">
                        <div class="submission-header">
                            <span class="submission-type-badge">
                                ${contributions[sub.type].title}
                            </span>
                            <span class="submission-date">${sub.date}</span>
                        </div>
                        <h4>${sub.title}</h4>
                        <p>${sub.description}</p>
                    </div>
                `).join('');
            } else {
                section.style.display = 'none';
            }
        }

        document.getElementById('contributionTypes').addEventListener('click', (e) => {
            const card = e.target.closest('.contribution-card');
            if (card) {
                selectedType = card.dataset.type;
                document.getElementById('contributionTypes').style.display = 'none';
                document.getElementById('contributionForm').style.display = 'block';
                document.getElementById('formTitle').textContent = contributions[selectedType].title;
            }
        });

        document.getElementById('btnCancel').addEventListener('click', () => {
            selectedType = null;
            document.getElementById('inputTitle').value = '';
            document.getElementById('inputDescription').value = '';
            document.getElementById('contributionForm').style.display = 'none';
            document.getElementById('contributionTypes').style.display = 'grid';
        });

        document.getElementById('btnSubmit').addEventListener('click', async () => {
            const title = document.getElementById('inputTitle').value;
            const description = document.getElementById('inputDescription').value;

            if (title && description) {
                const newSubmission = {
                    id: Date.now(),
                    type: selectedType,
                    title,
                    description,
                    date: new Date().toLocaleDateString('fr-FR')
                };

                submissions = [newSubmission, ...submissions];

                try {
                    await window.storage.set('contributions', JSON.stringify(submissions), true);
                    document.getElementById('inputTitle').value = '';
                    document.getElementById('inputDescription').value = '';
                    selectedType = null;
                    document.getElementById('contributionForm').style.display = 'none';
                    document.getElementById('contributionTypes').style.display = 'grid';
                    renderSubmissions();
                } catch (error) {
                    alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
                }
            }
        });

        loadSubmissions();