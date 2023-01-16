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

const getComponent = (props: any) :VHtmlLinkHandler => {
    return mount(VHtmlLinkHandler, {
        props,
    })
}

describe("VHtmlLinkHandler", () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })
    test("relative link -> router-push", async () => {
        const html = '<p><a href="/relative">relative</a></p>'
        const component = getComponent({html})

        await component.get("a").trigger("click")
        expect(mockedPush).toBeCalledWith("/relative")
    })
    test("internal link -> router-push", async () => {
        const html = `<p><a href="${window.location.origin}/relative">full path</a></p>`
        const component = getComponent({html})

        await component.get("a").trigger("click")
        expect(mockedPush).toBeCalledWith("/relative")
    })
    test("external link -> window open(blank)", async () => {
        const link = "https://example.com/hello"
        const html = `<p><a href="${link}">external</a></p>`
        const component = getComponent({html})

        await component.get("a").trigger("click")
        expect(mockedWindowOpen).toBeCalledWith(link, "_blank")
    })
})

export {}