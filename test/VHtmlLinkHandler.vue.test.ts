import {mount} from "@vue/test-utils";
import VHtmlLinkHandler from "../src/components/VHtmlLinkHandler.vue"

const mockedPush = vi.fn()
const mockedWindowOpen = vi.fn()

vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({
        push: mockedPush
    }))
}))

vi.mock('window', () => ({
    open: mockedWindowOpen,
}))

const getComponent = (props: any) :VHtmlLinkHandler => {
    return mount(VHtmlLinkHandler, {
        props,
    })
}

describe("VHtmlLinkHandler", () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })
    test("test", async () => {
        const html = '<p><a href="/relative">relative</a></p>'
        const component = getComponent({html})

        // expect router-push
        await component.get("a").trigger("click")
        expect(mockedPush).toBeCalled()
    })
})

export {}