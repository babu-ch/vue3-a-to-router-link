declare const _default: import("vue").DefineComponent<{
    html: {
        type: StringConstructor;
        required: false;
        default: string;
    };
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
    checkBlankInternalLink: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    checkBlankExternalLink: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    afterMove: (href: String) => void;
} & {
    afterMoveInternal: (href: String) => void;
} & {
    afterMoveExternal: (href: String) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    html: {
        type: StringConstructor;
        required: false;
        default: string;
    };
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
    checkBlankInternalLink: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    checkBlankExternalLink: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}>> & {
    onAfterMove?: ((href: String) => any) | undefined;
    onAfterMoveInternal?: ((href: String) => any) | undefined;
    onAfterMoveExternal?: ((href: String) => any) | undefined;
}, {
    html: string;
    tag: string;
    checkBlankInternalLink: boolean;
    checkBlankExternalLink: boolean;
}>;
export default _default;
