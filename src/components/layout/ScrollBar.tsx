export default function ScrollBar({ scolledProgress }: { scolledProgress: number }) {
    return (
        <div className="scroll_bar">
            <div className="scroll_bar_progress" style={{ height: scolledProgress * 100 + '%' }}></div>
        </div>
    )
}
