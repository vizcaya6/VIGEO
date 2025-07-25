// Funcionalidad para los tabs del login
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad de tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remover clase active de todos los botones y contenidos
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            btn.classList.add('active');
            
            // Mostrar el contenido correspondiente
            const targetContent = document.getElementById(targetTab + '-tab');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Funcionalidad del formulario de login
    const loginForm = document.getElementById('loginForm');
    const submitBtn = document.querySelector('.login-submit-btn');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar loader
            btnText.style.display = 'none';
            btnLoader.style.display = 'block';
            submitBtn.disabled = true;
            
            // Simular proceso de login (remover en producción)
            setTimeout(() => {
                // Ocultar loader
                btnText.style.display = 'block';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
                
                // Redirigir a la plataforma
                window.location.href = 'plataforma.html';
            }, 2000);
        });
    }
    
    // Efectos de focus en inputs
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // ========== FUNCIONALIDAD DEL DASHBOARD ==========
    
    // Navegación del sidebar
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const pageTitle = document.querySelector('.page-title');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = item.getAttribute('data-section');
            
            // Remover clase active de todos los nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Agregar clase active al item clickeado
            item.classList.add('active');
            
            // Ocultar todas las secciones
            contentSections.forEach(section => section.classList.remove('active'));
            // Mostrar la sección correspondiente
            const targetContent = document.getElementById(targetSection);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Actualizar título de la página
                const sectionTitles = {
                    'inversiones': 'Mis Inversiones',
                    'planes': 'Planes de Inversión',
                    'billetera': 'Billetera',
                    'oportunidades': 'Buscar Oportunidades',
                    'cuenta': 'Mi Cuenta',
                    'referidos': 'Referidos'
                };
                pageTitle.textContent = sectionTitles[targetSection] || 'Dashboard';
            }
        });
    });
    
    // Toggle del sidebar en móvil
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }
    
    // Cerrar sidebar al hacer click fuera (móvil)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 && sidebar && sidebar.classList.contains('open')) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });
    
    // Gráficos con Chart.js - Versión segura
    function initializeCharts() {
        if (typeof Chart !== 'undefined') {
            // Gráfico de Barras - Rendimiento Mensual
            const barCtx = document.getElementById('barChart');
            if (barCtx && !barCtx.chartInstance) {
                barCtx.chartInstance = new Chart(barCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                        datasets: [{
                            label: 'Ganancias ($)',
                            data: [850, 920, 1150, 980, 1200, 1350],
                            backgroundColor: 'rgba(32, 96, 61, 0.8)',
                            borderColor: '#20603d',
                            borderWidth: 1,
                            borderRadius: 4,
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        animation: {
                            duration: 1000
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 1500,
                                ticks: {
                                    stepSize: 300
                                },
                                grid: {
                                    color: 'rgba(0,0,0,0.1)'
                                }
                            },
                            x: {
                                grid: {
                                    display: false
                                }
                            }
                        }
                    }
                });
            }
            
            // Gráfico de Torta - Distribución por Tipo
            const pieCtx = document.getElementById('pieChart');
            if (pieCtx && !pieCtx.chartInstance) {
                pieCtx.chartInstance = new Chart(pieCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Fracción', 'Alquilada', 'Venta'],
                        datasets: [{
                            data: [45, 35, 20],
                            backgroundColor: [
                                '#20603d',
                                '#7dd87f',
                                '#16502f'
                            ],
                            borderWidth: 2,
                            borderColor: '#fff'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        animation: {
                            duration: 1000
                        },
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    padding: 15,
                                    usePointStyle: true,
                                    font: {
                                        size: 12
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    }
    
    // Inicializar gráficos con delay para evitar problemas
    setTimeout(initializeCharts, 500);
    
    // Funcionalidad de tabs en Mi Cuenta mejorada
    const accountTabs = document.querySelectorAll('.account-tab');
    const accountSections = document.querySelectorAll('.account-section');
    
    accountTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remover clase active de todos los tabs
            accountTabs.forEach(t => t.classList.remove('active'));
            accountSections.forEach(section => section.classList.remove('active'));
            
            // Agregar clase active al tab clickeado
            tab.classList.add('active');
            
            // Mostrar la sección correspondiente
            const targetSection = document.getElementById(targetTab);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // Funcionalidad del formulario de perfil
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = profileForm.querySelector('.form-btn.primary');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            // Mostrar loader
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            // Simular guardado
            setTimeout(() => {
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
                
                // Feedback visual
                btnText.textContent = '¡Guardado!';
                setTimeout(() => {
                    btnText.textContent = 'Guardar Cambios';
                }, 2000);
            }, 1500);
        });
    }
    
    // Funcionalidad de subida de archivos
    const fileUpload = document.getElementById('fileUpload');
    if (fileUpload) {
        fileUpload.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files.length > 0) {
                const uploadArea = document.querySelector('.upload-area');
                const uploadBtn = uploadArea.querySelector('.upload-btn');
                
                uploadBtn.textContent = `Subiendo ${files.length} archivo(s)...`;
                uploadBtn.disabled = true;
                
                // Simular subida
                setTimeout(() => {
                    uploadBtn.textContent = '✅ Archivos Subidos';
                    setTimeout(() => {
                        uploadBtn.textContent = 'Seleccionar Archivos';
                        uploadBtn.disabled = false;
                    }, 2000);
                }, 2000);
            }
        });
    }
    
    // Funcionalidad de toggle switches
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const switchElement = e.target.closest('.security-item, .notification-item');
            if (switchElement) {
                // Efecto visual de confirmación
                switchElement.style.background = 'rgba(32, 96, 61, 0.05)';
                setTimeout(() => {
                    switchElement.style.background = '';
                }, 500);
            }
        });
    });
    
    // Funcionalidad de botones de contratos
    const contractBtns = document.querySelectorAll('.contract-btn');
    contractBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const originalText = btn.textContent;
            
            if (btn.textContent.includes('Descargar')) {
                btn.textContent = 'Descargando...';
                btn.disabled = true;
                
                setTimeout(() => {
                    btn.textContent = '✅ Descargado';
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.disabled = false;
                    }, 2000);
                }, 1000);
            }
        });
    });
    
    // Funcionalidad de botones de documentos
    const docBtns = document.querySelectorAll('.doc-btn');
    docBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const originalText = btn.textContent;
            
            if (btn.textContent === 'Descargar') {
                btn.textContent = '⏳';
                btn.disabled = true;
                
                setTimeout(() => {
                    btn.textContent = '✅';
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.disabled = false;
                    }, 1500);
                }, 800);
            }
        });
    });
    
    // Funcionalidad del botón de editar avatar
    const avatarEditBtn = document.querySelector('.avatar-edit-btn');
    if (avatarEditBtn) {
        avatarEditBtn.addEventListener('click', () => {
            // Crear input de archivo temporal
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';
            
            fileInput.addEventListener('change', (e) => {
                if (e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const avatarImg = document.querySelector('.avatar-img');
                        avatarImg.src = e.target.result;
                        
                        // Feedback visual
                        avatarEditBtn.textContent = '✅';
                        setTimeout(() => {
                            avatarEditBtn.textContent = '📷';
                        }, 2000);
                    };
                    reader.readAsDataURL(e.target.files[0]);
                }
            });
            
            document.body.appendChild(fileInput);
            fileInput.click();
            document.body.removeChild(fileInput);
        });
    }
    
    // Funcionalidad del rango de precios mejorado
    const priceRange = document.getElementById('priceRange');
    const rangeValue = document.getElementById('rangeValue');
    
    if (priceRange && rangeValue) {
        priceRange.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            const formattedValue = value >= 1000 ? `$${Math.round(value/1000)}K` : `$${value}`;
            rangeValue.textContent = formattedValue;
        });
    }
    
    // Funcionalidad de filtros de oportunidades
    const clearFiltersBtn = document.getElementById('clearFilters');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const cityFilter = document.getElementById('cityFilter');
    const typeFilter = document.getElementById('typeFilter');
    const roiFilter = document.getElementById('roiFilter');
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            // Limpiar todos los filtros
            if (cityFilter) cityFilter.value = '';
            if (typeFilter) typeFilter.value = '';
            if (roiFilter) roiFilter.value = '';
            if (priceRange) {
                priceRange.value = 50000;
                rangeValue.textContent = '$50K';
            }
            
            // Feedback visual
            clearFiltersBtn.innerHTML = '<span class="btn-icon">✅</span>Filtros Limpiados';
            setTimeout(() => {
                clearFiltersBtn.innerHTML = '<span class="btn-icon">🔄</span>Limpiar Filtros';
            }, 2000);
        });
    }
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', () => {
            // Simular aplicación de filtros
            const filters = {
                city: cityFilter?.value || '',
                type: typeFilter?.value || '',
                roi: roiFilter?.value || '',
                maxPrice: priceRange?.value || 50000
            };
            
            console.log('Aplicando filtros:', filters);
            
            // Feedback visual
            const originalText = applyFiltersBtn.innerHTML;
            applyFiltersBtn.innerHTML = '<span class="btn-icon">⏳</span>Buscando...';
            applyFiltersBtn.disabled = true;
            
            setTimeout(() => {
                applyFiltersBtn.innerHTML = '<span class="btn-icon">✅</span>Resultados Actualizados';
                setTimeout(() => {
                    applyFiltersBtn.innerHTML = originalText;
                    applyFiltersBtn.disabled = false;
                }, 1500);
            }, 1000);
        });
    }
    
    // Funcionalidad de favoritos
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (btn.textContent === '🤍') {
                btn.textContent = '❤️';
                btn.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 200);
            } else {
                btn.textContent = '🤍';
            }
        });
    });
    
    // Funcionalidad de paginación
    const pageNumbers = document.querySelectorAll('.page-number');
    const pageButtons = document.querySelectorAll('.page-btn');
    
    pageNumbers.forEach(pageBtn => {
        pageBtn.addEventListener('click', () => {
            // Remover clase active de todos los números
            pageNumbers.forEach(p => p.classList.remove('active'));
            // Agregar clase active al clickeado
            pageBtn.classList.add('active');
            
            // Simular carga de página
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Funcionalidad mejorada de copiar enlace de referido
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            const linkInput = document.getElementById('referralLink');
            if (linkInput) {
                linkInput.select();
                document.execCommand('copy');
                
                const btnIcon = copyLinkBtn.querySelector('.btn-icon');
                const btnText = copyLinkBtn.querySelector('.btn-text');
                
                // Feedback visual
                btnIcon.textContent = '✅';
                btnText.textContent = '¡Copiado!';
                copyLinkBtn.style.background = '#16a34a';
                
                setTimeout(() => {
                    btnIcon.textContent = '📋';
                    btnText.textContent = 'Copiar';
                    copyLinkBtn.style.background = '#20603d';
                }, 2500);
            }
        });
    }
    
    // Funcionalidad de compartir en redes sociales
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = btn.getAttribute('data-platform');
            const referralLink = document.getElementById('referralLink')?.value || '';
            const shareText = '¡Únete a Vigeo Urban y comienza a invertir en bienes raíces! 🏠💰';
            
            let shareUrl = '';
            
            switch(platform) {
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + referralLink)}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(referralLink)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${encodeURIComponent('Invitación a Vigeo Urban')}&body=${encodeURIComponent(shareText + '\n\n' + referralLink)}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
                
                // Feedback visual
                const originalText = btn.querySelector('.social-text').textContent;
                btn.querySelector('.social-text').textContent = 'Compartido!';
                setTimeout(() => {
                    btn.querySelector('.social-text').textContent = originalText;
                }, 2000);
            }
        });
    });
    
    // Funcionalidad de descargar material promocional
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const originalText = btn.textContent;
            
            btn.textContent = 'Descargando...';
            btn.disabled = true;
            
            // Simular descarga
            setTimeout(() => {
                btn.textContent = '✅ Descargado';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 2000);
            }, 1500);
        });
    });
    
    // Funcionalidad de filtros en la tabla de referidos
    const statusFilter = document.getElementById('statusFilter');
    const periodFilter = document.getElementById('periodFilter');
    
    function filterReferrals() {
        const statusValue = statusFilter?.value || '';
        const periodValue = periodFilter?.value || '';
        const rows = document.querySelectorAll('.referral-row');
        
        rows.forEach(row => {
            let showRow = true;
            
            // Filtro por estado
            if (statusValue) {
                const statusBadge = row.querySelector('.status-badge');
                const rowStatus = statusBadge?.textContent.toLowerCase().includes('activo') ? 'active' : 
                                statusBadge?.textContent.toLowerCase().includes('pendiente') ? 'pending' : 'inactive';
                if (rowStatus !== statusValue) {
                    showRow = false;
                }
            }
            
            // Aquí se podría agregar filtro por período si tuviéramos las fechas parseadas
            
            row.style.display = showRow ? '' : 'none';
        });
        
        // Contar filas visibles
        const visibleRows = Array.from(rows).filter(row => row.style.display !== 'none').length;
        console.log(`Mostrando ${visibleRows} referidos`);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterReferrals);
    }
    
    if (periodFilter) {
        periodFilter.addEventListener('change', filterReferrals);
    }
    
    // Animación de las barras de progreso en los niveles
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    // Efecto hover en las cards de nivel
    const levelCards = document.querySelectorAll('.level-card');
    levelCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Actualización dinámica de estadísticas (simulado)
    function updateReferralStats() {
        const statNumbers = document.querySelectorAll('.referral-stats-grid .stat-number');
        
        statNumbers.forEach(stat => {
            if (Math.random() > 0.7) { // 30% de probabilidad de actualización
                const currentValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
                const change = Math.random() > 0.5 ? 1 : -1;
                const newValue = Math.max(0, currentValue + change);
                
                // Animación de cambio
                stat.style.transform = 'scale(1.1)';
                stat.style.color = change > 0 ? '#16a34a' : '#dc2626';
                
                setTimeout(() => {
                    if (stat.textContent.includes('$')) {
                        stat.textContent = `$${newValue.toLocaleString()}`;
                    } else {
                        stat.textContent = newValue.toString();
                    }
                    
                    setTimeout(() => {
                        stat.style.transform = 'scale(1)';
                        stat.style.color = '#222';
                    }, 300);
                }, 200);
            }
        });
    }
    
    // Actualizar estadísticas cada 30 segundos
    setInterval(updateReferralStats, 30000);
    
    // Animaciones de entrada para las cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar animaciones a las cards
    const cards = document.querySelectorAll('.stat-card, .chart-card, .plan-card, .wallet-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Actualizar balance en tiempo real (simulado)
    const balanceAmount = document.querySelector('.balance-amount');
    if (balanceAmount) {
        setInterval(() => {
            const currentBalance = parseFloat(balanceAmount.textContent.replace('$', '').replace(',', ''));
            const change = (Math.random() - 0.5) * 10; // Cambio aleatorio pequeño
            const newBalance = currentBalance + change;
            balanceAmount.textContent = `$${newBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        }, 30000); // Actualizar cada 30 segundos
    }
});
