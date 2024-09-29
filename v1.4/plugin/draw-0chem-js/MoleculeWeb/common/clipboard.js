async function pasteImage() {
    let destinationImage = document.getElementById("myImage")
    const permission = await navigator.permissions.query({name: 'clipboard-read'});
    if (permission.state === 'denied') {
        throw new Error('Not allowed to read clipboard.');
    }
    const clipboardContents = await navigator.clipboard.read();
    for (const item of clipboardContents) {
        if (!item.types.includes('image/png')) {
            throw new Error('Clipboard contains non-image data.');
        }
        const blob = await item.getType('image/png');
        destinationImage.src = URL.createObjectURL(blob);
    }
}

export async function copyText(value, fn) {
    navigator.permissions.query({name: "clipboard-copy"}).then((obj) => {
    }).catch(() => {
        if (fn != null) fn(-1, "没有剪贴板权限！");
        return true;
    });
    navigator.clipboard.writeText(value).then(res => {
        if (fn != null) fn(1, "剪贴板复制成功！");
    }).catch((obj) => {
        if (fn != null) fn(-1, "剪贴板写入失败！" + obj.toString());
    });
}

// 读取剪贴板的 mol 文本信息
export async function pasteText(fn){
    // navigator.permissions.query({name: "clipboard-read"}).then((obj) => {
    // }).catch(() => {
    //     if (fn != null) fn(-1, "没有剪贴板权限！");
    //     return true;
    // });
    navigator.clipboard.readText().then(v => {
        if (v === null || v.length < 1) {
            if (fn != null) fn(-3, '剪贴板为空!');
        } else {
            if (fn != null) fn(1, v);
        }
    }).catch(res => {
        if (fn != null) fn(-2, "没有剪贴板访问权限！");
    })
}
