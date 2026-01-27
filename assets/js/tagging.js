const debugMode = false
class Event {
    constructor(event_name, event_params = {}) {
        if (!window.gtag || window.dataLayer == undefined) {
            const advice = 'Inicialize a configuração do Google Analytics primeiro!'
            console.warn(advice)
            window.alert(advice)
            // return
        }
        const gtag = window.gtag
        gtag('event', event_name, event_params)
        console.table({ event_name, ...event_params })
        this.validate(event_name, event_params)

    }

    load_map(map_id, map_version) {
        const mapObject = { map_id, map_version }
        fetch("https://tagging-api-azvnjols4q-rj.a.run.app/load_map", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mapObject)
        }  ).then(response => response.json())
    }

    validate(event_name, event_params) {
        fetch('https://tagging-api-azvnjols4q-rj.a.run.app/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ event_name, event_params })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => {
            console.error('Validation error:', error);
        });
    }
}

//FIELDS
document.querySelectorAll('input[type=text], textarea').forEach(element => {
    element.addEventListener('change', (ev) => {
        const el = ev.currentTarget
        const tag_name = el.tagName.toLowerCase()
        const text = (el.value || '').trim().substring(0, 100)
        const id = el.id || null
        const classes = el.className || null
        const name = el.getAttribute('name') || null

        new Event('field_fill', {
            debug_mode: debugMode,
            page_location: location.href,
            page_path: location.pathname,
            element_tag: tag_name,
            element_text: text,
            element_id: id,
            element_classes: classes,
            element_name: name,
            section: el.closest('form') ? 'form' : null,
            label: el.closest('label') ? (el.closest('label').innerText || el.closest('label').textContent || '').trim().substring(0, 100) : null
        })
    })
})

//CLICKS
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('click', (ev) => {
        console.log('clicou')
        const el = ev.currentTarget
        const tag_name = el.tagName.toLowerCase()
        const text = (el.innerText || el.textContent || '').trim().substring(0, 100)
        const id = el.id || null
        const classes = el.className || null
        const href = (tag_name === 'a') ? el.getAttribute('href') : null
        const outbound = (href !== null && !href.includes(location.hostname) && href.startsWith('http')) ? true : false
        const section = el.closest('section, nav, header, footer', 'dialog')
        const component = tag_name === 'a' ? 'link' : (tag_name === 'button' ? 'botao' : null)
        
        new Event('click', {
            debug_mode: debugMode,
            page_location: location.href,
            page_path: location.pathname,
            element_tag: tag_name,
            element_text: text,
            element_id: id,
            element_classes: classes,
            element_href: href,
            outbound: outbound,
            section: section.id || section.tagName.toLowerCase() || null,
            label: [component, text].join(':').trim().replaceAll(/\s/g, '-').toLowerCase()
        })
    })
})