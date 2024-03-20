<script setup>
    import {useRouter} from "vue-router";
    import { useStore } from '@/stores'

    const store = useStore()
    const router = useRouter()
    const code = router.currentRoute.value.query.code

    store.getInvoices({code: code}).then(() => {
        store.dashboard.connected = true
        router.push({
            name: 'dashboard'
        })
    })
</script>

<template >
<div></div>
</template>

