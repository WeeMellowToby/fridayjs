const url = "http://192.168.101.15:5005/"

export function Play(group) {
    return fetch(url + group + "/play", {
        method: "GET",
    })
}
export function Pause(group) {
    return fetch(url + group + "/pause", {
        method: "GET",
    })
}