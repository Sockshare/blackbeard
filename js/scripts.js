// Black Beard's Portfolio v3 — Curated Home, Multi-View Explorer, Cmd+K Command Palette & Particles
(function () {
    'use strict';

    function esc(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function pad2(n) {
        return n < 10 ? '0' + n : String(n);
    }

    function resolveRel(pathFromRoot) {
        var p = window.location.pathname || '';
        if (p.indexOf('/projects/') !== -1 || p.indexOf('/stories/') !== -1 || p.indexOf('/posts/') !== -1) {
            return '../' + pathFromRoot;
        }
        return pathFromRoot;
    }

    // -----------------------------------------------------------------------
    // Card / Row Renderers (Projects & Blog Stories)
    // -----------------------------------------------------------------------
    function renderProjectGridCard(p, showPreviewBtn) {
        var badgeCls = p.badgeClass ? ' ' + esc(p.badgeClass) : '';
        var pills = (p.tech || []).slice(0, 4).map(function (t) {
            return '<span class="tech-pill">' + esc(t) + '</span>';
        }).join('');
        var extraCount = (p.tech || []).length - 4;
        if (extraCount > 0) {
            pills += '<span class="tech-pill">+' + extraCount + '</span>';
        }

        var leftAction = '';
        if (showPreviewBtn) {
            leftAction = '<button type="button" class="btn-card-action btn-card-ghost js-quick-preview" data-project-id="' + p.id + '">' +
                '<i class="fa-solid fa-expand"></i> Quick View</button>';
        } else if (p.github) {
            leftAction = '<a href="' + esc(p.github) + '" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-card-ghost" title="View Source on GitHub">' +
                '<i class="fa-brands fa-github"></i> GitHub</a>';
        } else {
            leftAction = '<span class="mono-tag small text-secondary">#' + pad2(p.id) + '</span>';
        }

        return (
            '<div class="col">' +
                '<div class="card h-100 d-flex flex-column">' +
                    '<a href="' + esc(resolveRel(p.href)) + '" class="card-img-wrapper d-block">' +
                        '<span class="card-id-ribbon">#' + pad2(p.id) + '</span>' +
                        (p.flagship ? '<span class="card-flagship-ribbon"><i class="fa-solid fa-star me-1"></i>Flagship</span>' : '') +
                        '<img src="' + esc(resolveRel(p.image)) + '" class="card-img-top" loading="lazy" alt="' + esc(p.title) + '">' +
                    '</a>' +
                    '<div class="card-body flex-grow-1">' +
                        '<span class="category-badge' + badgeCls + '">' + esc(p.badge) + '</span>' +
                        '<h5 class="card-title"><a href="' + esc(resolveRel(p.href)) + '" class="text-white text-decoration-none">' + esc(p.title) + '</a></h5>' +
                        '<p class="card-text">' + esc(p.summary) + '</p>' +
                        '<div class="tech-stack-mini">' + pills + '</div>' +
                    '</div>' +
                    '<div class="card-footer">' +
                        leftAction +
                        '<a href="' + esc(resolveRel(p.href)) + '" class="btn-card-action btn-card-primary">Open System <i class="fa-solid fa-arrow-right"></i></a>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }

    function renderProjectCompactCard(p) {
        var pills = (p.tech || []).slice(0, 3).map(function (t) {
            return '<span class="tech-pill">' + esc(t) + '</span>';
        }).join('');
        return (
            '<div class="compact-item-card">' +
                '<a href="' + esc(resolveRel(p.href)) + '">' +
                    '<img src="' + esc(resolveRel(p.image)) + '" class="compact-thumb" loading="lazy" alt="' + esc(p.title) + '">' +
                '</a>' +
                '<div class="compact-body">' +
                    '<div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-1">' +
                        '<span class="mono-tag small text-info">#' + pad2(p.id) + ' &bull; ' + esc(p.badge) + '</span>' +
                        '<div class="d-flex align-items-center gap-2">' +
                            (p.github ? '<a href="' + esc(p.github) + '" target="_blank" rel="noopener noreferrer" class="text-secondary small text-decoration-none" title="GitHub"><i class="fa-brands fa-github"></i></a>' : '') +
                            '<a href="' + esc(resolveRel(p.href)) + '" class="text-info small text-decoration-none fw-semibold">Open <i class="fa-solid fa-arrow-right"></i></a>' +
                        '</div>' +
                    '</div>' +
                    '<a href="' + esc(resolveRel(p.href)) + '" class="compact-title">' + esc(p.title) + '</a>' +
                    '<p class="compact-desc">' + esc(p.summary) + '</p>' +
                    '<div class="d-flex flex-wrap gap-1">' + pills + '</div>' +
                '</div>' +
            '</div>'
        );
    }

    function renderProjectsTable(list) {
        var rows = list.map(function (p) {
            var pills = (p.tech || []).slice(0, 3).map(function (t) {
                return '<span class="tech-pill">' + esc(t) + '</span>';
            }).join(' ');
            return (
                '<tr>' +
                    '<td class="mono-tag text-info fw-semibold">#' + pad2(p.id) + (p.flagship ? ' ★' : '') + '</td>' +
                    '<td>' +
                        '<a href="' + esc(resolveRel(p.href)) + '" class="dir-title-link">' + esc(p.title) + '</a>' +
                        '<div class="dir-subline">' + esc(p.summary) + '</div>' +
                    '</td>' +
                    '<td><span class="category-badge ' + esc(p.badgeClass || '') + ' mb-0">' + esc(p.badge) + '</span></td>' +
                    '<td><div class="d-flex flex-wrap gap-1">' + pills + '</div></td>' +
                    '<td class="text-nowrap text-end">' +
                        (p.github ? '<a href="' + esc(p.github) + '" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-card-ghost py-1 px-2 me-1" title="GitHub"><i class="fa-brands fa-github"></i></a>' : '') +
                        '<a href="' + esc(resolveRel(p.href)) + '" class="btn-card-action btn-card-primary py-1 px-2">Open <i class="fa-solid fa-arrow-right"></i></a>' +
                    '</td>' +
                '</tr>'
            );
        }).join('');
        return (
            '<div class="directory-table-wrap">' +
                '<table class="directory-table">' +
                    '<thead><tr><th>ID</th><th>System &amp; Summary</th><th>Domain</th><th>Core Stack</th><th class="text-end">Actions</th></tr></thead>' +
                    '<tbody>' + rows + '</tbody>' +
                '</table>' +
            '</div>'
        );
    }

    function renderStoryGridCard(s) {
        var badgeCls = s.badgeClass ? ' ' + esc(s.badgeClass) : '';
        return (
            '<div class="col">' +
                '<div class="card h-100 d-flex flex-column">' +
                    '<a href="' + esc(resolveRel(s.href)) + '" class="card-img-wrapper d-block">' +
                        '<span class="card-id-ribbon">Story #' + pad2(s.id) + '</span>' +
                        '<img src="' + esc(resolveRel(s.image)) + '" class="card-img-top" loading="lazy" alt="' + esc(s.title) + '">' +
                    '</a>' +
                    '<div class="card-body flex-grow-1">' +
                        '<div class="d-flex justify-content-between align-items-center gap-2 mb-2">' +
                            '<span class="category-badge' + badgeCls + ' mb-0">' + esc(s.badge) + '</span>' +
                            '<span class="mono-tag small text-secondary text-nowrap"><i class="fa-regular fa-clock me-1"></i>' + esc(s.readTime) + '</span>' +
                        '</div>' +
                        '<h5 class="card-title"><a href="' + esc(resolveRel(s.href)) + '" class="text-white text-decoration-none">' + esc(s.title) + '</a></h5>' +
                        '<p class="card-text mb-0">' + esc(s.summary) + '</p>' +
                    '</div>' +
                    '<div class="card-footer">' +
                        '<span class="mono-tag small text-secondary">Story #' + pad2(s.id) + '</span>' +
                        '<a href="' + esc(resolveRel(s.href)) + '" class="btn-card-action btn-card-primary">Read Dispatch <i class="fa-solid fa-arrow-right"></i></a>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }

    function renderStoryCompactCard(s) {
        return (
            '<div class="compact-item-card">' +
                '<a href="' + esc(resolveRel(s.href)) + '">' +
                    '<img src="' + esc(resolveRel(s.image)) + '" class="compact-thumb" loading="lazy" alt="' + esc(s.title) + '">' +
                '</a>' +
                '<div class="compact-body">' +
                    '<div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-1">' +
                        '<span class="mono-tag small text-info">Story #' + pad2(s.id) + ' &bull; ' + esc(s.readTime) + '</span>' +
                        '<a href="' + esc(resolveRel(s.href)) + '" class="text-info small text-decoration-none fw-semibold">Read <i class="fa-solid fa-arrow-right"></i></a>' +
                    '</div>' +
                    '<a href="' + esc(resolveRel(s.href)) + '" class="compact-title">' + esc(s.title) + '</a>' +
                    '<p class="compact-desc mb-0">' + esc(s.summary) + '</p>' +
                '</div>' +
            '</div>'
        );
    }

    function renderStoriesTable(list) {
        var rows = list.map(function (s) {
            return (
                '<tr>' +
                    '<td class="mono-tag text-info fw-semibold">#' + pad2(s.id) + '</td>' +
                    '<td>' +
                        '<a href="' + esc(resolveRel(s.href)) + '" class="dir-title-link">' + esc(s.title) + '</a>' +
                        '<div class="dir-subline">' + esc(s.summary) + '</div>' +
                    '</td>' +
                    '<td><span class="category-badge ' + esc(s.badgeClass || '') + ' mb-0">' + esc(s.badge) + '</span></td>' +
                    '<td class="mono-tag text-nowrap">' + esc(s.readTime) + '</td>' +
                    '<td class="text-nowrap text-end">' +
                        '<a href="' + esc(resolveRel(s.href)) + '" class="btn-card-action btn-card-primary py-1 px-2">Read <i class="fa-solid fa-arrow-right"></i></a>' +
                    '</td>' +
                '</tr>'
            );
        }).join('');
        return (
            '<div class="directory-table-wrap">' +
                '<table class="directory-table">' +
                    '<thead><tr><th>Story</th><th>Title &amp; Synopsis</th><th>Topic</th><th>Read Time</th><th class="text-end">Open</th></tr></thead>' +
                    '<tbody>' + rows + '</tbody>' +
                '</table>' +
            '</div>'
        );
    }

    // -----------------------------------------------------------------------
    // 1. Homepage Curated Flagship Showcase + Track Selector + Quick Modal
    // -----------------------------------------------------------------------
    function initHomepageShowcase(catalog) {
        var gridEl = document.getElementById('home-projects-grid');
        if (!gridEl || !catalog) return;

        var activeCat = 'flagship';
        var visibleLimit = 6;
        var trackCards = document.querySelectorAll('[data-track-select]');
        var filterBtns = document.querySelectorAll('#home-filter-bar .filter-btn');
        var moreBarEl = document.getElementById('home-projects-more-bar');

        function getFilteredProjects() {
            var all = catalog.projects.slice();
            if (activeCat === 'flagship') {
                return all.filter(function (p) { return p.flagship; })
                    .sort(function (a, b) { return a.flagshipRank - b.flagshipRank; });
            }
            if (activeCat === 'all') {
                return all;
            }
            return all.filter(function (p) {
                return (p.categories || []).indexOf(activeCat) !== -1;
            });
        }

        function renderHomeProjects() {
            var filtered = getFilteredProjects();
            var shown = filtered.slice(0, visibleLimit);
            gridEl.innerHTML = shown.map(function (p) {
                return renderProjectGridCard(p, true);
            }).join('');

            if (moreBarEl) {
                var remaining = Math.max(0, filtered.length - shown.length);
                var explorerHref = activeCat === 'flagship' || activeCat === 'all'
                    ? 'projects.html'
                    : 'projects.html?cat=' + encodeURIComponent(activeCat);
                var statusTxt = activeCat === 'flagship'
                    ? 'Showing <strong>6 Curated Flagship Systems</strong> out of <strong>' + catalog.projects.length + ' Total Projects</strong>'
                    : 'Showing <strong>' + shown.length + '</strong> of <strong>' + filtered.length + '</strong> systems in this track';

                var expandBtn = remaining > 0
                    ? '<button type="button" class="btn-card-action btn-card-ghost" id="btn-home-expand-more">' +
                        '<i class="fa-solid fa-plus"></i> Show ' + Math.min(9, remaining) + ' More Here (' + remaining + ' left)</button>'
                    : '';

                moreBarEl.innerHTML =
                    '<div class="small text-secondary">' + statusTxt + '</div>' +
                    '<div class="d-flex flex-wrap gap-2">' +
                        expandBtn +
                        '<a href="' + explorerHref + '" class="btn-card-action btn-card-primary">' +
                            '<i class="fa-solid fa-table-list"></i> Open Full ' + catalog.projects.length + '-Project Explorer (Search &amp; Table View) <i class="fa-solid fa-arrow-right"></i>' +
                        '</a>' +
                    '</div>';

                var expBtn = document.getElementById('btn-home-expand-more');
                if (expBtn) {
                    expBtn.addEventListener('click', function () {
                        visibleLimit += 9;
                        renderHomeProjects();
                    });
                }
            }
        }

        function setHomeCategory(cat, scrollIntoView) {
            activeCat = cat;
            visibleLimit = 6;
            filterBtns.forEach(function (b) {
                b.classList.toggle('active', b.getAttribute('data-filter') === cat);
            });
            trackCards.forEach(function (tc) {
                tc.classList.toggle('active', tc.getAttribute('data-track-select') === cat);
            });
            renderHomeProjects();
            if (scrollIntoView) {
                var sec = document.getElementById('projects');
                if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                setHomeCategory(btn.getAttribute('data-filter') || 'flagship', false);
            });
        });

        trackCards.forEach(function (tc) {
            tc.addEventListener('click', function (e) {
                e.preventDefault();
                setHomeCategory(tc.getAttribute('data-track-select') || 'flagship', true);
            });
        });

        // Dynamic Quick-Preview Modal Delegation
        gridEl.addEventListener('click', function (e) {
            var btn = e.target.closest('.js-quick-preview');
            if (!btn) return;
            var pid = parseInt(btn.getAttribute('data-project-id'), 10);
            var proj = catalog.projects.find(function (x) { return x.id === pid; });
            if (!proj) return;

            var modalEl = document.getElementById('quickPreviewModal');
            if (!modalEl) return;
            document.getElementById('qpModalBadge').textContent = proj.badge;
            document.getElementById('qpModalTitle').textContent = proj.title;
            var imgEl = document.getElementById('qpModalImg');
            imgEl.src = resolveRel(proj.image);
            imgEl.alt = proj.title;
            document.getElementById('qpModalSummary').textContent = proj.modalSummary || proj.summary;
            document.getElementById('qpModalTech').innerHTML = (proj.tech || []).map(function (t) {
                return '<span class="tech-pill">' + esc(t) + '</span>';
            }).join('');
            var ghBtn = document.getElementById('qpModalGithub');
            if (proj.github) {
                ghBtn.href = proj.github;
                ghBtn.style.display = 'inline-flex';
            } else {
                ghBtn.style.display = 'none';
            }
            document.getElementById('qpModalOpen').href = resolveRel(proj.href);
            if (window.bootstrap && window.bootstrap.Modal) {
                window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
            }
        });

        renderHomeProjects();

        // Render 6 Curated Blog Stories on Homepage if container exists
        var homeStoriesEl = document.getElementById('home-stories-grid');
        if (homeStoriesEl && catalog.stories) {
            var featuredStories = catalog.stories
                .filter(function (s) { return s.featured; })
                .sort(function (a, b) { return a.featuredRank - b.featuredRank; })
                .slice(0, 6);
            homeStoriesEl.innerHTML = featuredStories.map(renderStoryGridCard).join('');
        }
    }

    // -----------------------------------------------------------------------
    // 2. Full Explorer Engine (projects.html & blog.html)
    // -----------------------------------------------------------------------
    function initFullExplorer(catalog) {
        var explorerRoot = document.getElementById('explorer-results-container');
        if (!explorerRoot || !catalog) return;

        var mode = explorerRoot.getAttribute('data-explorer-type'); // 'projects' | 'stories'
        var rawItems = mode === 'projects' ? catalog.projects.slice() : catalog.stories.slice();

        var params = new URLSearchParams(window.location.search);
        var state = {
            q: (params.get('q') || '').trim(),
            cat: params.get('cat') || 'all',
            view: params.get('view') || 'grid',
            sort: params.get('sort') || 'newest',
            limit: 12,
        };

        var searchInput = document.getElementById('explorer-search');
        var clearBtn = document.getElementById('explorer-clear');
        var sortSelect = document.getElementById('explorer-sort');
        var viewBtns = document.querySelectorAll('[data-explorer-view]');
        var catBtns = document.querySelectorAll('[data-explorer-cat]');
        var statusEl = document.getElementById('explorer-status-text');
        var moreWrap = document.getElementById('explorer-more-wrap');

        if (searchInput) searchInput.value = state.q;
        if (sortSelect) sortSelect.value = state.sort;

        function syncUrl() {
            var p = new URLSearchParams();
            if (state.cat && state.cat !== 'all') p.set('cat', state.cat);
            if (state.q) p.set('q', state.q);
            if (state.view && state.view !== 'grid') p.set('view', state.view);
            if (state.sort && state.sort !== 'newest') p.set('sort', state.sort);
            var qs = p.toString();
            var nextUrl = window.location.pathname + (qs ? '?' + qs : '');
            window.history.replaceState(null, '', nextUrl);
        }

        function matchesQuery(item, qLower) {
            if (!qLower) return true;
            var hay = [
                '#' + item.id,
                '#' + pad2(item.id),
                item.title,
                item.badge,
                item.summary,
                (item.tech || []).join(' '),
                (item.categories || []).join(' '),
            ].join(' ').toLowerCase();
            return qLower.split(/\s+/).every(function (tok) {
                return hay.indexOf(tok) !== -1;
            });
        }

        function renderExplorer() {
            var qLower = state.q.toLowerCase();
            if (clearBtn) clearBtn.style.display = state.q ? 'block' : 'none';

            catBtns.forEach(function (b) {
                b.classList.toggle('active', b.getAttribute('data-explorer-cat') === state.cat);
            });
            viewBtns.forEach(function (b) {
                b.classList.toggle('active', b.getAttribute('data-explorer-view') === state.view);
            });

            var filtered = rawItems.filter(function (item) {
                var catOk = state.cat === 'all' ||
                    (state.cat === 'flagship' ? (item.flagship || item.featured) : (item.categories || []).indexOf(state.cat) !== -1);
                return catOk && matchesQuery(item, qLower);
            });

            filtered.sort(function (a, b) {
                if (state.sort === 'flagship') {
                    var fa = (a.flagship || a.featured) ? 0 : 1;
                    var fb = (b.flagship || b.featured) ? 0 : 1;
                    if (fa !== fb) return fa - fb;
                    return b.id - a.id;
                }
                if (state.sort === 'oldest') return a.id - b.id;
                if (state.sort === 'alpha') return a.title.localeCompare(b.title);
                return b.id - a.id; // newest default
            });

            // Determine progressive slice (Table view or active search shows all immediately!)
            var showAllImmediately = state.view === 'table' || Boolean(state.q);
            var stepSize = state.view === 'compact' ? 18 : 12;
            var effectiveLimit = showAllImmediately ? filtered.length : Math.max(state.limit, stepSize);
            var shown = filtered.slice(0, effectiveLimit);

            if (statusEl) {
                var noun = mode === 'projects' ? 'systems' : 'stories & playbooks';
                statusEl.innerHTML = 'Showing <strong class="text-white">' + shown.length + '</strong> of <strong class="text-info">' +
                    filtered.length + '</strong> matching ' + noun +
                    (filtered.length < rawItems.length ? ' <span class="text-muted">(filtered from ' + rawItems.length + ' total)</span>' : '');
            }

            if (filtered.length === 0) {
                explorerRoot.innerHTML =
                    '<div class="detail-hero-box text-center py-5">' +
                        '<i class="fa-solid fa-satellite-dish fa-2x text-info mb-3"></i>' +
                        '<h4 class="text-white">No matching items found</h4>' +
                        '<p class="text-secondary mb-3">Try clearing the search filter or switching back to All Categories.</p>' +
                        '<button type="button" class="btn-card-action btn-card-primary" id="btn-reset-explorer">Reset Filters</button>' +
                    '</div>';
                var resetBtn = document.getElementById('btn-reset-explorer');
                if (resetBtn) {
                    resetBtn.addEventListener('click', function () {
                        state.q = '';
                        state.cat = 'all';
                        state.limit = 12;
                        if (searchInput) searchInput.value = '';
                        syncUrl();
                        renderExplorer();
                    });
                }
                if (moreWrap) moreWrap.innerHTML = '';
                return;
            }

            if (state.view === 'table') {
                explorerRoot.innerHTML = mode === 'projects' ? renderProjectsTable(shown) : renderStoriesTable(shown);
            } else if (state.view === 'compact') {
                var compactHtml = shown.map(mode === 'projects' ? renderProjectCompactCard : renderStoryCompactCard).join('');
                explorerRoot.innerHTML = '<div class="compact-grid">' + compactHtml + '</div>';
            } else {
                var gridHtml = shown.map(function (it) {
                    return mode === 'projects' ? renderProjectGridCard(it, false) : renderStoryGridCard(it);
                }).join('');
                explorerRoot.innerHTML = '<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">' + gridHtml + '</div>';
            }

            if (moreWrap) {
                var rem = filtered.length - shown.length;
                if (rem > 0) {
                    moreWrap.innerHTML =
                        '<div class="progressive-more-bar">' +
                            '<div class="small text-secondary">Viewing <strong>' + shown.length + '</strong> of <strong>' + filtered.length + '</strong> — load more below or switch to <strong>Directory Table</strong> to scan everything at once.</div>' +
                            '<div class="d-flex flex-wrap gap-2">' +
                                '<button type="button" class="btn-card-action btn-card-ghost" id="btn-exp-load-more"><i class="fa-solid fa-angles-down"></i> Load ' + Math.min(stepSize, rem) + ' More</button>' +
                                '<button type="button" class="btn-card-action btn-card-primary" id="btn-exp-show-all">Show All ' + filtered.length + '</button>' +
                            '</div>' +
                        '</div>';
                    document.getElementById('btn-exp-load-more').addEventListener('click', function () {
                        state.limit = shown.length + stepSize;
                        renderExplorer();
                    });
                    document.getElementById('btn-exp-show-all').addEventListener('click', function () {
                        state.limit = filtered.length;
                        renderExplorer();
                    });
                } else {
                    moreWrap.innerHTML = '';
                }
            }
        }

        if (searchInput) {
            searchInput.addEventListener('input', function () {
                state.q = searchInput.value.trim();
                syncUrl();
                renderExplorer();
            });
        }
        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                state.q = '';
                if (searchInput) {
                    searchInput.value = '';
                    searchInput.focus();
                }
                syncUrl();
                renderExplorer();
            });
        }
        if (sortSelect) {
            sortSelect.addEventListener('change', function () {
                state.sort = sortSelect.value;
                syncUrl();
                renderExplorer();
            });
        }
        viewBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                state.view = btn.getAttribute('data-explorer-view') || 'grid';
                state.limit = state.view === 'compact' ? 18 : 12;
                syncUrl();
                renderExplorer();
            });
        });
        catBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                state.cat = btn.getAttribute('data-explorer-cat') || 'all';
                state.limit = state.view === 'compact' ? 18 : 12;
                syncUrl();
                renderExplorer();
            });
        });

        renderExplorer();
    }

    // -----------------------------------------------------------------------
    // 3. Global Cmd+K / Ctrl+K / "/" Instant Search Command Palette
    // -----------------------------------------------------------------------
    function initCommandPalette(catalog) {
        if (!catalog) return;

        var totalCount = catalog.projects.length + catalog.stories.length;
        var backdrop = document.createElement('div');
        backdrop.className = 'cmdk-backdrop';
        backdrop.id = 'cmdk-backdrop';
        backdrop.setAttribute('role', 'dialog');
        backdrop.setAttribute('aria-modal', 'true');
        backdrop.setAttribute('aria-label', 'Quick Search Portfolio');

        backdrop.innerHTML =
            '<div class="cmdk-dialog">' +
                '<div class="cmdk-header">' +
                    '<i class="fa-solid fa-magnifying-glass"></i>' +
                    '<input type="text" class="cmdk-input" id="cmdk-input" placeholder="Jump to any of the ' + totalCount + ' projects or blog playbooks (try &quot;RAG&quot;, &quot;MCP&quot;, &quot;SOC 2&quot;, &quot;#35&quot;)..." autocomplete="off">' +
                    '<button type="button" class="cmdk-scope-btn" id="cmdk-esc-btn">ESC</button>' +
                '</div>' +
                '<div class="cmdk-scope-bar">' +
                    '<div class="cmdk-scope-pills">' +
                        '<button type="button" class="cmdk-scope-btn active" data-cmdk-scope="all">All (' + totalCount + ')</button>' +
                        '<button type="button" class="cmdk-scope-btn" data-cmdk-scope="projects">Projects (' + catalog.projects.length + ')</button>' +
                        '<button type="button" class="cmdk-scope-btn" data-cmdk-scope="stories">Stories &amp; Playbooks (' + catalog.stories.length + ')</button>' +
                    '</div>' +
                    '<span class="mono-tag small text-muted" id="cmdk-count-label">' + totalCount + ' indexed</span>' +
                '</div>' +
                '<div class="cmdk-results" id="cmdk-results"></div>' +
                '<div class="cmdk-footer">' +
                    '<span><span class="kbd-chip">&uarr;</span> <span class="kbd-chip">&darr;</span> Navigate &nbsp;&bull;&nbsp; <span class="kbd-chip">Enter</span> Open</span>' +
                    '<span><a href="' + esc(resolveRel('projects.html?view=table')) + '" class="text-info text-decoration-none">Full Table Index &rarr;</a></span>' +
                '</div>' +
            '</div>';

        document.body.appendChild(backdrop);

        var inputEl = document.getElementById('cmdk-input');
        var resultsEl = document.getElementById('cmdk-results');
        var countLbl = document.getElementById('cmdk-count-label');
        var scopeBtns = backdrop.querySelectorAll('[data-cmdk-scope]');
        var scope = 'all';
        var activeIdx = 0;
        var currentMatches = [];

        var unified = [];
        catalog.projects.forEach(function (p) {
            unified.push({
                kind: 'project',
                id: p.id,
                code: '#' + pad2(p.id),
                flagship: Boolean(p.flagship),
                title: p.title,
                meta: p.badge + (p.tech && p.tech.length ? ' • ' + p.tech.slice(0, 3).join(', ') : ''),
                href: resolveRel(p.href),
                searchBlob: ('project #' + p.id + ' #' + pad2(p.id) + ' ' + p.title + ' ' + p.badge + ' ' + p.summary + ' ' + (p.tech || []).join(' ')).toLowerCase(),
            });
        });
        catalog.stories.forEach(function (s) {
            unified.push({
                kind: 'story',
                id: s.id,
                code: 'S#' + pad2(s.id),
                flagship: Boolean(s.featured),
                title: s.title,
                meta: s.badge + ' • ' + s.readTime,
                href: resolveRel(s.href),
                searchBlob: ('story blog #' + s.id + ' #' + pad2(s.id) + ' ' + s.title + ' ' + s.badge + ' ' + s.summary).toLowerCase(),
            });
        });

        function renderCmdkList() {
            var q = (inputEl.value || '').trim().toLowerCase();
            var tokens = q ? q.split(/\s+/) : [];
            currentMatches = unified.filter(function (u) {
                if (scope === 'projects' && u.kind !== 'project') return false;
                if (scope === 'stories' && u.kind !== 'story') return false;
                return tokens.every(function (t) { return u.searchBlob.indexOf(t) !== -1; });
            });

            if (activeIdx >= currentMatches.length) activeIdx = 0;
            countLbl.textContent = currentMatches.length + ' match' + (currentMatches.length === 1 ? '' : 'es');

            if (currentMatches.length === 0) {
                resultsEl.innerHTML = '<div class="text-center text-secondary py-4 small">No matching projects or stories for "' + esc(q) + '".</div>';
                return;
            }

            resultsEl.innerHTML = currentMatches.slice(0, 30).map(function (item, idx) {
                var cls = idx === activeIdx ? 'cmdk-item active' : 'cmdk-item';
                var tagCls = item.kind === 'project' ? 'cmdk-type-tag cmdk-type-proj' : 'cmdk-type-tag cmdk-type-story';
                return (
                    '<a href="' + esc(item.href) + '" class="' + cls + '" data-cmdk-idx="' + idx + '">' +
                        '<div class="cmdk-item-left">' +
                            '<span class="' + tagCls + '">' + esc(item.code) + '</span>' +
                            '<div style="min-width:0">' +
                                '<div class="cmdk-item-title">' + esc(item.title) + '</div>' +
                                '<div class="cmdk-item-meta">' + esc(item.meta) + '</div>' +
                            '</div>' +
                        '</div>' +
                        '<i class="fa-solid fa-arrow-turn-down fa-rotate-90 text-info small flex-shrink-0"></i>' +
                    '</a>'
                );
            }).join('');
        }

        function openPalette() {
            backdrop.classList.add('open');
            activeIdx = 0;
            renderCmdkList();
            setTimeout(function () { inputEl.focus(); inputEl.select(); }, 20);
        }

        function closePalette() {
            backdrop.classList.remove('open');
        }

        document.querySelectorAll('[data-open-cmdk]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                openPalette();
            });
        });

        document.getElementById('cmdk-esc-btn').addEventListener('click', closePalette);
        backdrop.addEventListener('click', function (e) {
            if (e.target === backdrop) closePalette();
        });

        scopeBtns.forEach(function (b) {
            b.addEventListener('click', function () {
                scope = b.getAttribute('data-cmdk-scope') || 'all';
                scopeBtns.forEach(function (x) { x.classList.toggle('active', x === b); });
                activeIdx = 0;
                renderCmdkList();
                inputEl.focus();
            });
        });

        inputEl.addEventListener('input', function () {
            activeIdx = 0;
            renderCmdkList();
        });

        document.addEventListener('keydown', function (e) {
            var isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
            var tag = (document.activeElement && document.activeElement.tagName || '').toLowerCase();
            var inField = tag === 'input' || tag === 'textarea' || tag === 'select';

            if (isCmdK || (!inField && e.key === '/' && !backdrop.classList.contains('open'))) {
                e.preventDefault();
                if (backdrop.classList.contains('open')) {
                    closePalette();
                } else {
                    openPalette();
                }
                return;
            }

            if (!backdrop.classList.contains('open')) return;

            if (e.key === 'Escape') {
                e.preventDefault();
                closePalette();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                var max = Math.min(currentMatches.length, 30);
                if (max > 0) {
                    activeIdx = (activeIdx + 1) % max;
                    renderCmdkList();
                    var el = resultsEl.querySelector('.cmdk-item.active');
                    if (el) el.scrollIntoView({ block: 'nearest' });
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                var maxUp = Math.min(currentMatches.length, 30);
                if (maxUp > 0) {
                    activeIdx = (activeIdx - 1 + maxUp) % maxUp;
                    renderCmdkList();
                    var elUp = resultsEl.querySelector('.cmdk-item.active');
                    if (elUp) elUp.scrollIntoView({ block: 'nearest' });
                }
            } else if (e.key === 'Enter') {
                var target = currentMatches[activeIdx];
                if (target) {
                    e.preventDefault();
                    window.location.href = target.href;
                }
            }
        });
    }

    // -----------------------------------------------------------------------
    // 4. Initialize Everything on DOMContentLoaded
    // -----------------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', function () {
        var catalog = window.PORTFOLIO_CATALOG || null;
        initHomepageShowcase(catalog);
        initFullExplorer(catalog);
        initCommandPalette(catalog);

        try {
            var particleEl = document.getElementById('interactive-particle-container');
            if (particleEl && typeof window.particlesJS === 'function') {
                window.particlesJS('interactive-particle-container', {
                    particles: {
                        number: { value: 45, density: { enable: true, value_area: 750 } },
                        color: { value: '#00d4ff' },
                        shape: { type: 'circle' },
                        opacity: { value: 0.5, random: true },
                        size: { value: 3.2, random: true },
                        line_linked: { enable: true, distance: 145, color: '#00ff9d', opacity: 0.32, width: 1 },
                        move: { enable: true, speed: 1.6, direction: 'none', out_mode: 'out' }
                    },
                    interactivity: {
                        detect_on: 'canvas',
                        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                        modes: { repulse: { distance: 90, duration: 0.4 }, push: { particles_nb: 4 } }
                    },
                    retina_detect: true
                });
            }
        } catch (err) {
            console.warn('Particles initialization skipped:', err);
        }
    });
})();
