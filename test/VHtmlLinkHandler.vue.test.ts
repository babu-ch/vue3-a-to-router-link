import {mount} from "@vue/test-utils";
import VHtmlLinkHandler from "../src/components/VHtmlLinkHandler.vue"

const mockedPush = vi.fn()
const mockedWindowOpen = vi.fn()

vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({
        push: mockedPush
    }))
}))

window.open = mockedWindowOpen

const getComponent = (props: any): VHtmlLinkHandler => {
    return mount(VHtmlLinkHandler, {
        props,
    })
}

const relativeHtml = '<p><a href="/relative">relative</a></p>'
const externalLink = "https://example.com/hello"
const externalHtml = `<p><a href="${externalLink}">external</a></p>`

describe("VHtmlLinkHandler", () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })
    describe("default", () => {
        test("relative link -> router-push", async () => {
            const component = getComponent({html: relativeHtml})

            await component.get("a").trigger("click")
            expect(mockedPush).toBeCalledWith("/relative")

            expect(component.emitted("afterMoveInternal"))
            expect(component.emitted("afterMove"))
        })
        test("internal link -> router-push", async () => {
            const html = `<p><a href="${window.location.origin}/relative">full path</a></p>`
            const component = getComponent({html})

            await component.get("a").trigger("click")
            expect(mockedPush).toBeCalledWith("/relative")

            expect(component.emitted("afterMoveInternal"))
            expect(component.emitted("afterMove"))
        })
        test("external link -> window open(blank)", async () => {
            const component = getComponent({html: externalHtml})

            await component.get("a").trigger("click")
            expect(mockedWindowOpen).toBeCalledWith(externalLink, "_blank")

            expect(component.emitted("afterMoveExternal"))
            expect(component.emitted("afterMove"))
        })
    })
    describe("callback", () => {
        test("internal callback(true) -> router-push", async () => {
            const component = getComponent({html: relativeHtml, beforeMoveInternalCallBack() { return true }})

            await component.get("a").trigger("click")
            expect(mockedPush).toBeCalledWith("/relative")
        })
        test("internal callback(false) -> nope", async () => {
            const component = getComponent({html: relativeHtml, beforeMoveInternalCallBack() { return false }})

            await component.get("a").trigger("click")
            expect(mockedPush).not.toBeCalled()
        })
        test("internal async callback(true) -> router-push", async () => {
            const component = getComponent({html: relativeHtml, async beforeMoveInternalCallBack() { return true }})

            await component.get("a").trigger("click")
            expect(mockedPush).toBeCalledWith("/relative")
        })
        test("internal async callback(false) -> nope", async () => {
            const component = getComponent({html: relativeHtml, async beforeMoveInternalCallBack() { return false }})

            await component.get("a").trigger("click")
            expect(mockedPush).not.toBeCalled()
        })
        test("external callback(true) -> window.open", async () => {
            const component = getComponent({html: externalHtml, beforeMoveExternalCallBack() { return true }})

            await component.get("a").trigger("click")
            expect(mockedWindowOpen).toBeCalledWith(externalLink, "_blank")
        })
        test("external callback(false) -> nope", async () => {
            const component = getComponent({html: externalHtml, beforeMoveExternalCallBack() { return false }})

            await component.get("a").trigger("click")
            expect(mockedWindowOpen).not.toBeCalled()
        })
        test("external async callback(true) -> window.open", async () => {
            const component = getComponent({html: externalHtml, async beforeMoveExternalCallBack() { return true }})

            await component.get("a").trigger("click")
            expect(mockedWindowOpen).toBeCalledWith(externalLink, "_blank")
        })
        test("external async callback(false) -> nope", async () => {
            const component = getComponent({html: externalHtml, async beforeMoveExternalCallBack() { return false }})

            await component.get("a").trigger("click")
            expect(mockedWindowOpen).not.toBeCalled()
        })
    })
    describe("check blank", () => {
        test("internal check blank(tag is not _blank) -> router-push", async () => {
            const component = getComponent({html: relativeHtml, checkBlankInternalLink: true})

            await component.get("a").trigger("click")
            expect(mockedPush).toBeCalled()
        })
        test("internal check blank(tag is _blank) -> window.open", async () => {
            const component = getComponent({html: "<a href='/relative' target='_blank'>relative</a>", checkBlankInternalLink: true})

            await component.get("a").trigger("click")
            expect(mockedWindowOpen).toBeCalled()
        })
        test("external check blank(tag is not _blank) -> window.open(_self)", async () => {
            const component = getComponent({html: externalHtml, checkBlankExternalLink: true})

            await component.get("a").trigger("click")
            expect(mockedWindowOpen).toBeCalledWith(externalLink, "_self")
        })
        test("external check blank(tag is _blank) -> window.open(_blank)", async () => {
            const component = getComponent({html: `<a href="${externalLink}" target="_blank">external</a>`, checkBlankExternalLink: true})

            await component.get("a").trigger("click")
            expect(mockedWindowOpen).toBeCalledWith(externalLink, "_blank")
        })
    })
})

export {}