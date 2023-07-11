import { Groups } from "@mui/icons-material"
import { FunctionComponent, useContext, useEffect, useState } from "react"
import Splitter from "../../../components/Splitter"
import { NwbFileContext } from "../NwbFileContext"
import { useGroup } from "../NwbMainView/NwbMainView"
import { RemoteH5File, RemoteH5Group } from "../RemoteH5File/RemoteH5File"

type Props = {
    width: number
    height: number
    path: string
    condensed?: boolean
}

const ImageSegmentationItemView: FunctionComponent<Props> = ({width, height, path, condensed}) => {
    const nwbFile = useContext(NwbFileContext)
    if (!nwbFile) throw Error('Unexpected: nwbFile is null')
    const group = useGroup(nwbFile, path)

    const [selectedSegmentationName, setSelectedSegmentationName] = useState<string | undefined>(undefined)
    useEffect(() => {
        if (!group) return
        if (group.subgroups.length === 0) return
        setSelectedSegmentationName(group.subgroups[0].name)
    }, [group])

    if (!group) return <div>Loading group: {path}</div>
    return (
        <Splitter
            width={width}
            height={height}
            initialPosition={Math.min(400, width / 3)}
        >
            <LeftPanel
                width={0}
                height={0}
                group={group}
                nwbFile={nwbFile}
                selectedSegmentationName={selectedSegmentationName}
                setSelectedSegmentationName={setSelectedSegmentationName}
            />
            {selectedSegmentationName ? <MainPanel
                width={0}
                height={0}
                group={group}
                nwbFile={nwbFile}
                selectedSegmentationName={selectedSegmentationName}
            /> : <div />}
        </Splitter>
    )
}

type LeftPanelProps = {
    width: number
    height: number
    group: RemoteH5Group
    nwbFile: RemoteH5File
    selectedSegmentationName?: string
    setSelectedSegmentationName: (name: string) => void
}

const LeftPanel: FunctionComponent<LeftPanelProps> = ({width, height, group, nwbFile, selectedSegmentationName, setSelectedSegmentationName}) => {
    return (
        <table className="nwb-table">
            <tbody>
                {
                    group.subgroups.map(sg => (
                        <tr key={sg.name}>
                            <td>
                                <input type="radio" name="segmentation" checked={sg.name === selectedSegmentationName} onChange={() => setSelectedSegmentationName(sg.name)} />
                            </td>
                            <td>
                                {sg.name}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

type MainPanelProps = {
    width: number
    height: number
    group: RemoteH5Group
    nwbFile: RemoteH5File
    selectedSegmentationName: string
}

const MainPanel: FunctionComponent<MainPanelProps> = ({width, height, group, nwbFile, selectedSegmentationName}) => {
    const segGroup = useGroup(nwbFile, `${group.path}/${selectedSegmentationName}`)
    console.log('segGroup', segGroup)
    return <div>Main</div>
}

export default ImageSegmentationItemView