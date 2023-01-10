declare const _default: import("vue").DefineComponent<{
    html: StringConstructor;
    tag: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    beforeMoveInternalCallBack: {
        type: FunctionConstructor;
        required: false;
    };
    beforeMoveExternalCallBack: {
        type: FunctionConstructor;
        required: false;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    afterMove: (href: String) => void;
} & {
    afterMoveInternal: (href: String) => void;
} & {
    afterMoveExternal: (href: String) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    html: StringConstructor;
    tag: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    beforeMoveInternalCallBack: {
        type: FunctionConstructor;
        required: false;
    };
    beforeMoveExternalCallBack: {
        type: FunctionConstructor;
        required: false;
    };
}>> & {
    onAfterMove?: ((href: String) => any) | undefined;
    onAfterMoveInternal?: ((href: String) => any) | undefined;
    onAfterMoveExternal?: ((href: String) => any) | undefined;
}, {
    tag: string;
}>;
export default _default;
